import { SegmentsActionType } from './segments.actions';
import { initialState } from './segments.provider';

export const SegmentsReducer = (prevState, action) => {
    switch (action.type) {
        case SegmentsActionType.UPDATE:
            return {...action.value}
        case SegmentsActionType.RESET:
            return {...initialState}
    }
    return prevState;
};