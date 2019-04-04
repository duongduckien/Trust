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

export function* searchFriends(action: any) {

    try {

        console.log(action);
        return true;

    } catch (err) {
        console.log(err);
    }

}

export function* watchSearchFriends() {
    yield takeLatest(types.SEARCH_FRIENDS, searchFriends);
}

const friendsSaga = [
    fork(watchSearchFriends),
];

export default friendsSaga;
