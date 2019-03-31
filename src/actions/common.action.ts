import { 
    SHOW_LOADING, 
    SHOW_ALERT, 
    CHANGE_ROOT_SCREEN,
} from './types';

export const showLoading = (data: boolean) => ({
    type: SHOW_LOADING,
    data,
});

export const showAlert = (data: any) => ({
    type: SHOW_ALERT,
    data,
});

export const changeRootScreen = (data: string) => ({
    type: CHANGE_ROOT_SCREEN,
    data,
});