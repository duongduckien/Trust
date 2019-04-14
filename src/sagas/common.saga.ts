import { put, call, fork, takeLatest, takeEvery } from 'redux-saga/effects';
import { Actions } from 'react-native-router-flux';
import * as types from '../actions/types';

// Actions
import { getCurrentUserSuccess } from '../actions/common.action';

// Services
import userService from '../services/user.service';

// Utilities
import helper from '../utilities/helper';

// Interfaces
import { ICurrentUser } from '../interfaces/user.interface';

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

export function* getCurrentUser() {

    try {

        const currentUser: ICurrentUser = yield helper.getCurrentUser();
        const currentUserInfo = yield call(userService.getUserInfoByID, currentUser.userId);
        yield put(getCurrentUserSuccess(currentUserInfo[0]));

    } catch (e) {
        console.log(e);
    }

}

export function* watchGetCurrentUser() {
    yield takeEvery(types.GET_CURRENT_USER, getCurrentUser);
}

const commonSaga = [
    fork(watchShowLoading),
    fork(watchGetCurrentUser),
];

export default commonSaga;