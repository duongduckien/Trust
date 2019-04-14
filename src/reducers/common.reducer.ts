import * as types from '../actions/types';

export interface ICommonState {
    showLoading: boolean;
    showConfirmDialog: any;
    showAlertDialog: any;
    rootScreen: string;
    currentUser: any;
}

export const COMMON_INITAL_STATE: ICommonState = {
    showLoading: false,
    showConfirmDialog: {},
    showAlertDialog: {},
    rootScreen: 'ContactScreen',
    currentUser: {},
};

export function commonReducer(state = COMMON_INITAL_STATE, action: any): ICommonState {
    switch (action.type) {
        case types.SHOW_LOADING: {
            return { ...state, ...{ showLoading: action.data } };
        }
        case types.SHOW_CONFIRM_DIALOG: {
            return { ...state, ...{ showConfirmDialog: action.data } };
        }
        case types.SHOW_ALERT_DIALOG: {
            return { ...state, ...{ showAlertDialog: action.data } };
        }
        case types.CHANGE_ROOT_SCREEN: {
            return { ...state, ...{ rootScreen: action.data } };
        }
        case types.GET_CURRENT_USER_SUCCESS: {
            return { ...state, ...{ currentUser: action.data } };
        }
        default: {
            return state;
        }   
    }
}
