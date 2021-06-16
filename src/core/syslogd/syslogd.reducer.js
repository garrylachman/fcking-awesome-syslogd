import { SyslogdActionType } from './syslogd.actions';
import { initialState } from './syslogd.provider';

export const SyslogdReducer = (prevState, action) => {
    switch (action.type) {
        case SyslogdActionType.ADD:
            return {
                lines: [...prevState.lines, action.value]
            }
        case SyslogdActionType.RESET:
            return {...initialState}
    }
    return prevState;
};