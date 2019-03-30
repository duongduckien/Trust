import { put, call, fork, takeLatest, takeEvery } from 'redux-saga/effects';
import { Actions } from 'react-native-router-flux';
import * as types from '../actions/types';

// Services
import apiService from '../services/api';

export function* getMessages(action: any) {

    try {

        console.log(action);
        const data = action.data;
        const result = yield apiService.getMessages(data.userId, data.guestId);
        return true;

    } catch (err) {
        action.onError(err);
    }

}

export function* watchGetMessages() {
    yield takeEvery(types.GET_MESSAGES, getMessages);
}

const chatSaga = [
    fork(watchGetMessages),
];

export default chatSaga;