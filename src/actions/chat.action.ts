import { GET_LIST_FRIENDS, GET_LIST_FRIENDS_SUCCESS } from './types';

export const getListFriends = () => ({
    type: GET_LIST_FRIENDS,
});

export const getListFriendsSuccess = (data: any) => ({
    type: GET_LIST_FRIENDS_SUCCESS,
    data,
});
