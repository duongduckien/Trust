import * as types from '../actions/types';

export interface ICommonState {
    showLoading: boolean;
    showAlert: any;
    rootScreen: string;
}

export const COMMON_INITAL_STATE: ICommonState = {
    showLoading: false,
    showAlert: {},
    rootScreen: 'MessagesScreen'
};

export function commonReducer(state = COMMON_INITAL_STATE, action: any): ICommonState {
    switch (action.type) {
        case types.SHOW_LOADING: {
            return { ...state, ...{ showLoading: action.data } };
        }
        case types.SHOW_ALERT: {
            return { ...state, ...{ showAlert: action.data } };
        }
        case types.CHANGE_ROOT_SCREEN: {
            return { ...state, ...{ rootScreen: action.data } };
        }
        default: {
            return state;
        }   
    }
}
