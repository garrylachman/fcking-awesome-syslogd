import React from 'react';
import { usePersistStorage } from "react-native-use-persist-storage";
import { FiltersInitialState } from '../filters/filters.provider';
import { SegmentsInitialState } from '../segments/segments.provider';

export const PersistContext = React.createContext({});

/*const useMMKVStorage = (key, initialState) => {
    let initState = initialState;
    try {
        initState = JSON.parse(MMKV.getString(key));
    } catch(e) {}

    const [state, setState] = React.useState(initState);

    React.useEffect(() => {
        MMKV.set(key, JSON.stringify(state));
    }, [state]);

    return [state, setState];
}*/

export const PersistContextProvider = ({children}) => {

    console.log("PersistContextProvider", FiltersInitialState)
    const [filters, setFilters, filtersRestored] = usePersistStorage("@filters", FiltersInitialState);
    const [segments, setSegments, segmentsRestored] = usePersistStorage("@segments", SegmentsInitialState);

    return (
        <PersistContext.Provider value={{
            filtersPersist: filters,
            setFiltersPersist: setFilters,
            filtersRestored: filtersRestored,
            segmentsPersist: segments,
            setSegmentsPersist: setSegments,
            segmentsRestored: segmentsRestored
        }}>
            {children}
        </PersistContext.Provider>
    )
}