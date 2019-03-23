import { SHOW_LOADING, SHOW_ALERT, LOGOUT, CHANGE_ROOT_SCREEN } from './types';

export const showLoading = (data: boolean) => ({
    type: SHOW_LOADING,
    data,
});

export const showAlert = (data: any) => ({
    type: SHOW_ALERT,
    data,
});

export const logOut = () => ({
    type: LOGOUT,
});

export const changeRootScreen = (data: string) => ({
    type: CHANGE_ROOT_SCREEN,
    data,
});