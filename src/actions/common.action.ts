import { SHOW_LOADING } from './types';

export const showLoading = (data: boolean) => ({
    type: SHOW_LOADING,
    data,
})