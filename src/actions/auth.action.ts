import { 
    LOGIN,
    LOGOUT,
} from './types';

export const login = (items: any) => ({
    type: LOGIN,
    payload: {
        items,
    },
});

export const logout = () => ({
    type: LOGOUT,
});