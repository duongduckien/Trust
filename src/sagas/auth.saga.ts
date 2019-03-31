import { put, call, fork, takeLatest, takeEvery } from 'redux-saga/effects';
import { Actions } from 'react-native-router-flux';
import * as types from '../actions/types';
import { showLoading } from '../actions/common.action';

// Languages
import { strings } from '../utilities/i18n';

// Utilities
import helper from '../utilities/helper';
import storage from '../utilities/storage';

// Services
import authService from '../services/auth.service';
import userService from '../services/user.service';

export function* login(action: any) {

    try {

        yield put(showLoading(true));
        const params = action.payload.items;
        const data = yield call(authService.login, params);
        console.log(data);
        yield put(showLoading(false));

        Actions.home();

    } catch (err) {
        console.log(err);
        yield put(showLoading(false));
        helper.showAlert('error', strings('EMAIL_OR_PASSWORD_INCORRECT'));
    }

}

export function* watchLogin() {
    yield takeLatest(types.LOGIN, login);
}

export function* logout() {

    try {

        yield authService.logout();
        Actions.login();

    } catch (e) {
        console.log(e);
    }

}

export function* watchLogout() {
    yield takeEvery(types.LOGOUT, logout);
}

const authSaga = [
    fork(watchLogin),
    fork(watchLogout),
];

export default authSaga;
