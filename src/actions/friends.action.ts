import { 
    SEARCH_FRIENDS,
} from './types';

export const searchFriends = (data: any) => ({
    type: SEARCH_FRIENDS,
    data,
});
