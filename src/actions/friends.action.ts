import { 
    SEARCH_FRIENDS, 
    GET_FRIENDS_SUCCESS,
    CLEAR_SEARCH_FRIENDS,
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