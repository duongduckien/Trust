import { 
    GET_LIST_FRIENDS, 
    GET_LIST_FRIENDS_SUCCESS,
    GET_MESSAGES,
    GET_MESSAGES_SUCCESS,
} from './types';

export const getListFriends = () => ({
    type: GET_LIST_FRIENDS,
});

export const getListFriendsSuccess = (data: any) => ({
    type: GET_LIST_FRIENDS_SUCCESS,
    data,
});

export const getMessages = (data: any) => ({
    type: GET_MESSAGES,
    data,
});

export const getMessagesSuccess = (data: any) => ({
    type: GET_MESSAGES_SUCCESS,
    data,
});
