import * as types from '../actions/types';

export interface ICommonState {
    showLoading: boolean;
    showConfirmDialog: any;
    rootScreen: string;
}

export const COMMON_INITAL_STATE: ICommonState = {
    showLoading: false,
    showConfirmDialog: {},
    rootScreen: 'ContactScreen'
};

export function commonReducer(state = COMMON_INITAL_STATE, action: any): ICommonState {
    switch (action.type) {
        case types.SHOW_LOADING: {
            return { ...state, ...{ showLoading: action.data } };
        }
        case types.SHOW_CONFIRM_DIALOG: {
            return { ...state, ...{ showConfirmDialog: action.data } };
        }
        case types.CHANGE_ROOT_SCREEN: {
            return { ...state, ...{ rootScreen: action.data } };
        }
        default: {
            return state;
        }   
    }
}
