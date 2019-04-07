import { 
    SEARCH_FRIENDS, 
    GET_FRIENDS_SUCCESS,
    CLEAR_SEARCH_FRIENDS,
    ADD_FRIEND,
    REMOVE_FRIEND_ADD_SUCCESS,
    GET_LIST_FRIENDS_ADDED,
    GET_LIST_FRIENDS_ADDED_SUCCESS,
} from './types';

export const searchFriends = (data: any) => ({
    type: SEARCH_FRIENDS,
    data,
});

export const getFriendsSuccess = (data: any) => ({
    type: GET_FRIENDS_SUCCESS,
    data,
});

export const clearSearchFriends = () => ({
    type: CLEAR_SEARCH_FRIENDS,
});

export const addFriend = (data: any) => ({
    type: ADD_FRIEND,
    data,
});

export const removeFriendAddSuccess = (data: any) => ({
    type: REMOVE_FRIEND_ADD_SUCCESS,
    data,
});

export const getListFriendsAdded = () => ({
    type: GET_LIST_FRIENDS_ADDED,
});

export const getListFriendsAddedSuccess = (data: any) => ({
    type: GET_LIST_FRIENDS_ADDED_SUCCESS,
    data,
});