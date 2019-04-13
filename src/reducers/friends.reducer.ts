import _ from 'lodash';
import * as types from '../actions/types';

// Interfaces
import { IFriendDataUpdateStore } from '../interfaces/friend.interface';

export interface IFriendsState {
    listFriends: any[];
    listFriendsAdded: any[];
}

export const FRIENDS_INITAL_STATE: IFriendsState = {
    listFriends: [],
    listFriendsAdded: [],
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

function acceptFriendSuccess(state: any, action: any) {
    const dataAction: IFriendDataUpdateStore = action.data;
    if (state.listFriendsAdded.length > 0) {
        for (let item of state.listFriendsAdded) {
            if (item.$key && item.$key === dataAction.key) {
                item.accepted = dataAction.accepted;
                item.timeAccepted = dataAction.timeAccepted;
            }
            break;
        }
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
        case types.GET_LIST_FRIENDS_ADDED_SUCCESS: {
            return { ...state, ...{ listFriendsAdded: action.data } };
        }
        case types.ACCEPT_FRIEND_SUCCESS: {
            return acceptFriendSuccess(state, action);
        }
        default: {
            return state;
        }
    }
}
