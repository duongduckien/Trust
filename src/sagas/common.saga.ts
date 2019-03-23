import { put, call, fork, takeLatest, takeEvery } from 'redux-saga/effects';
import { Actions } from 'react-native-router-flux';
import * as types from '../actions/types';

// Services
import { APIService } from '../services/api';
const apiService = new APIService();

export function* showLoading(action: any) {

    try {

        return true;

    } catch (err) {
        action.onError(err);
    }

}

export function* watchShowLoading() {
    yield takeEvery(types.SHOW_LOADING, showLoading);
}

export function* logOut() {

    try {

        yield apiService.logout();
        Actions.login();
        console.log('Logout success');

    } catch (e) {
        console.log(e);
    }

}

export function* watchLogOut() {
    yield takeEvery(types.LOGOUT, logOut);
}

const commonSaga = [
    fork(watchShowLoading),
    fork(watchLogOut),
];

export default commonSaga;