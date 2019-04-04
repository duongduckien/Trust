import * as types from '../actions/types';

export interface IFriendsState {
    listFriends: any[];
}

export const FRIENDS_INITAL_STATE: IFriendsState = {
    listFriends: [],
};

export function friendsReducer(state = FRIENDS_INITAL_STATE, action: any): IFriendsState {
    switch (action.type) {
        case types.GET_FRIENDS_SUCCESS: {
            return { ...state, ...{ listFriends: action.data } };
        }
        case types.CLEAR_SEARCH_FRIENDS: {
            return { ...state, ...{ listFriends: [] } };
        }
        default: {
            return state;
        }
    }
}
