import { FiltersActionType } from './filters.actions';
import { FiltersInitialState } from './filters.provider';

export const FiltersReducer = (prevState, action) => {
    switch (action.type) {
        case FiltersActionType.ADD:
            return {
                filters: [...prevState.filters, action.value]
            }
        case FiltersActionType.DELETE_BY_INDEX:
            return {
                filters: [...prevState.filters].filter((value, index) => index != action.index)
            }
        case FiltersActionType.DELETE:
            return {
                filters: [...prevState.filters].filter((value) => value != action.value)
            }
        case FiltersActionType.UPDATE:
            return {
                filters: action.value
            }
        case FiltersActionType.SET:
            return {...action.value}
        case FiltersActionType.RESET:
            return {...FiltersInitialState}
    }
    return prevState;
};