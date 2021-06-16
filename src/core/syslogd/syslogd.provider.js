import React from 'react';
import { SyslogdReducer } from './syslogd.reducer';
import { SyslogdActionType } from './syslogd.actions';
import { NativeModules, NativeEventEmitter } from 'react-native';
import { FiltersContext } from '../store/filters';
import { SegmentsContext } from '../store/segments';

const { SyslogModule } = NativeModules;
const SyslogModuleEmitter = new NativeEventEmitter(SyslogModule);

export const initialState = {
    lines: []
};

export const SyslogdContext = React.createContext();

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}


export const SyslogdContextProvider = ({children}) =>  {
    const [filtersState, filtersDispatcher, filtersComposedRegex] = React.useContext(FiltersContext)
    const [segmentsState, segmentsDispatcher, matchRegex, extractRegex] = React.useContext(SegmentsContext);

    const [state, dispatcher] = React.useReducer(SyslogdReducer, initialState);
    const [serverState, setServerState] = React.useState(false);

    const [segmentsData, setSegmentsData] = React.useState([]);

    const filtersComposedRegexRef = React.useRef(filtersComposedRegex);
    const segmentsRef = React.useRef([matchRegex, extractRegex, segmentsState]);

    React.useEffect(() => {
      filtersComposedRegexRef.current = filtersComposedRegex;
    }, [filtersState])

    React.useEffect(() => {
      segmentsRef.current = [matchRegex, extractRegex, segmentsState];
    }, [matchRegex, extractRegex, segmentsState])

    React.useEffect(async () => {
      await sleep(5000);
        SyslogModuleEmitter.addListener('onMessage', (data) => {
          const [matchRegexRef, extractRegexRef, segmentsStateRef] = segmentsRef.current;
          dispatcher({
              type: SyslogdActionType.ADD,
              value: {
                ...data,
                msg: data.msg.trim(),
                isFiltered: filtersComposedRegexRef.current && filtersComposedRegexRef.current.test(data.msg)
              }
          });
          if (matchRegexRef && extractRegexRef && segmentsStateRef.mapping.length > 0) {
            if (matchRegexRef.test(data.msg)) {
              const regexRes = extractRegexRef.exec(data.msg.trim());
              if (regexRes.length > 1)    {
                  const segLine = {};
                  regexRes.slice(1).forEach((value, index) => {
                    segLine[segmentsStateRef.mapping[index].name] = value
                  });
                  setSegmentsData(old => [...old, segLine]);
              }
            }
          }
        });
        return () => {
            SyslogModuleEmitter.removeAllListeners('onMessage');
            SyslogModule.stopServer();
        }
    }, []);

    React.useEffect(() => {
      if (serverState) {
        SyslogModule.startServer();
      } else {
        SyslogModule.stopServer();
      }
    }, [serverState]);

    const start = React.useCallback((port) => {
        SyslogModule.setPort(8088);
        setServerState(true);
    }, []);

    const stop = React.useCallback(() => setServerState(false), []);

    const reset = React.useCallback(() => dispatcher({type: SyslogdActionType.RESET}), []);

    return (
        <SyslogdContext.Provider value={[state, serverState, start, stop, reset, segmentsData]}>
          {children}
        </SyslogdContext.Provider>
      );
}