import { put, call, fork, takeLatest } from 'redux-saga/effects';
import { Actions } from 'react-native-router-flux';
import * as types from '../actions/types';
import apiService from '../services/api';
import { showLoading } from '../actions/common.action';

// Languages
import { strings } from '../utilities/i18n';

// Utilities
import helper from '../utilities/helper';
import storage from '../utilities/storage';

export function* login(action: any) {

    try {

        yield put(showLoading(true));
        const params = action.payload.items;
        const data = yield call(apiService.login, params);
        console.log(data);
        storage.setItem('userData', JSON.stringify(data.user._user));
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

const loginSaga = [
    fork(watchLogin),
];

export default loginSaga;
