import * as types from '../actions/types';

export interface CommonState {
    showLoading: boolean;
}

export const COMMON_INITAL_STATE: CommonState = {
    showLoading: false
};

export function commonReducer(state = COMMON_INITAL_STATE, action: any): CommonState {
    switch (action.type) {
        case types.SHOW_LOADING: {
            return { ...state, ...{ showLoading: action.data } };
        }
        default: {
            return state;
        }   
    }
}
