import _ from 'lodash';
import * as types from '../actions/types';

export interface IFriendsState {
    listFriends: any[];
}

export const FRIENDS_INITAL_STATE: IFriendsState = {
    listFriends: [],
};

function removeFriendAddSuccess(state: any, action: any) {
    const userId = action.data;
    if (state.listFriends.length > 0) {
        _.remove(state.listFriends, (el: any) => {
            return el.userId === userId;
        });
    }
    return { ...state };
}

export function friendsReducer(state = FRIENDS_INITAL_STATE, action: any): IFriendsState {
    switch (action.type) {
        case types.GET_FRIENDS_SUCCESS: {
            return { ...state, ...{ listFriends: action.data } };
        }
        case types.CLEAR_SEARCH_FRIENDS: {
            return { ...state, ...{ listFriends: [] } };
        }
        case types.REMOVE_FRIEND_ADD_SUCCESS: {
            return removeFriendAddSuccess(state, action);
        }
        default: {
            return state;
        }
    }
}
