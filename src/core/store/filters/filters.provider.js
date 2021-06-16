import React from 'react';
import { FiltersActionType } from './filters.actions';
import { FiltersReducer } from './filters.reducer';
import { Load, Store } from './filters.storage';

export const FiltersInitialState = {
    filters: []
};

export const FiltersContext = React.createContext();


export const FiltersContextProvider = ({children}) =>  {
  const [state, dispatcher] = React.useReducer(FiltersReducer, FiltersInitialState);

  const regexs = React.useMemo(() => state.filters.map(r => new RegExp(r.pattern)), [state]);

  const composedRegex = React.useMemo(() => {
    if (regexs && regexs.length >0) {
        return new RegExp(
          regexs.map(r => r.source).join("|")
        )
    }
    return null;
  }, [regexs]);

  React.useEffect(() => {
    async function load() {
      const data = await Load();
      if (data) {
        dispatcher({
          type: FiltersActionType.SET,
          value: data
        })
      }
    }
    load();
  }, []);

  React.useEffect(() => {
    Store(state);
  }, [state]);

  

  return (
      <FiltersContext.Provider value={[state, dispatcher, composedRegex]}>
        {children}
      </FiltersContext.Provider>
    );
}