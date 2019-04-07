import { 
    SHOW_LOADING, 
    SHOW_CONFIRM_DIALOG,
    SHOW_ALERT_DIALOG,
    CHANGE_ROOT_SCREEN,
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