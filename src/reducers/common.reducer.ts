import * as types from '../actions/types';

export interface CommonState {
    showLoading: boolean;
    showAlert: any;
}

export const COMMON_INITAL_STATE: CommonState = {
    showLoading: false,
    showAlert: {},
};

export function commonReducer(state = COMMON_INITAL_STATE, action: any): CommonState {
    switch (action.type) {
        case types.SHOW_LOADING: {
            return { ...state, ...{ showLoading: action.data } };
        }
        case types.SHOW_ALERT: {
            return { ...state, ...{ showAlert: action.data } };
        }
        default: {
            return state;
        }   
    }
}
