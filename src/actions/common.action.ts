import { 
    SHOW_LOADING, 
    SHOW_CONFIRM_DIALOG,
    SHOW_ALERT_DIALOG,
    CHANGE_ROOT_SCREEN,
    GET_CURRENT_USER,
    GET_CURRENT_USER_SUCCESS,
} from './types';

export const showLoading = (data: boolean) => ({
    type: SHOW_LOADING,
    data,
});

export const showConfirmDialog = (data: any) => ({
    type: SHOW_CONFIRM_DIALOG,
    data,
});

export const showAlertDialog = (data: any) => ({
    type: SHOW_ALERT_DIALOG,
    data,
});

export const changeRootScreen = (data: string) => ({
    type: CHANGE_ROOT_SCREEN,
    data,
});

export const getCurrentUser = () => ({
    type: GET_CURRENT_USER,
});

export const getCurrentUserSuccess = (data: any) => ({
    type: GET_CURRENT_USER_SUCCESS,
    data,
});