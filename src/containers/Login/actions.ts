import { 
    LOGIN
} from '../../actions/types';

export const login = (items: any) => ({
    type: LOGIN,
    payload: {
        items,
    },
});