import { put, call, fork, takeLatest, takeEvery } from 'redux-saga/effects';
import { Actions } from 'react-native-router-flux';
import * as types from '../actions/types';

// Services
import apiService from '../services/api';

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

const commonSaga = [
    fork(watchShowLoading),
];

export default commonSaga;