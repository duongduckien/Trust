import * as types from '../actions/types';

export interface IChatState {
    messages: any[];
}

export const CHAT_INITAL_STATE: IChatState = {
    messages: [],
};

export function chatReducer(state = CHAT_INITAL_STATE, action: any): IChatState {
    switch (action.type) {
        case types.GET_MESSAGES_SUCCESS: {
            return { ...state, ...{ messages: action.data } };
        }
        default: {
            return state;
        }   
    }
}
