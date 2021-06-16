import { Text } from '@ui-kitten/components';
import React from 'react';
import { SegmentsActionType } from './segments.actions';
import { SegmentsReducer } from './segments.reducer';
import { Load, Store } from './segments.storage';

export const initialState = {
  enabled: false,
  matchRegex: null,
  extractRegex: null,
  sampleLine: null,
  mapping: []
};

export const SegmentsContext = React.createContext();

const FakeStateConsumer = ({state, children}) => (
  <>
    {children}
  </>
)

const Loading = () => {
  return <Text>Loading</Text>
}

export const SegmentsContextProvider = ({children}) =>  {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [state, dispatcher] = React.useReducer(SegmentsReducer, null);

  const matchRegex = React.useMemo(() => {
    if (state?.matchRegex) {
      try {
        return new RegExp(state.matchRegex);
      } catch(er) {}
    }
    return null;
  }, [state?.matchRegex]);

  const extractRegex = React.useMemo(() => {
    if (state?.extractRegex) {
      try {
        return new RegExp(state.extractRegex);
      } catch(er) {}
    }
    return null;
  }, [state?.extractRegex]);

  React.useEffect(() => {
    async function load() {
      const data = await Load();
      if (data) {
        dispatcher({
          type: SegmentsActionType.UPDATE,
          value: data
        })
      } else {
        dispatcher({
          type: SegmentsActionType.UPDATE,
          value: initialState
        })
      }
    }
    setTimeout(() => load(), 5000);
  }, []);

  React.useEffect(() => {
    if (isLoaded) {
      Store(state);
    }
  }, [state]);

  
  return (
      <SegmentsContext.Provider value={[state, dispatcher, matchRegex, extractRegex]}>
        {children}
      </SegmentsContext.Provider>
  );
}