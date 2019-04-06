import { put, call, fork, takeLatest, takeEvery } from 'redux-saga/effects';
import { Actions } from 'react-native-router-flux';
import * as types from '../actions/types';
import { getFriendsSuccess, clearSearchFriends } from '../actions/friends.action';
import { showLoading } from '../actions/common.action';

// Languages
import { strings } from '../utilities/i18n';

// Utilities
import helper from '../utilities/helper';
import storage from '../utilities/storage';

// Services
import authService from '../services/auth.service';
import userService from '../services/user.service';
import friendsService from '../services/friends.service';

export function* searchFriends(action: any) {

    try {

        yield put(showLoading(true));

        if (action.data.trim() !== '') {
            const result = yield call(friendsService.searchFriends, action.data);
            console.log(result);
            yield put(getFriendsSuccess(result));
        } else {
            yield put(clearSearchFriends());
        }

    } catch (err) {
        console.log(err);
    } finally {
        helper.dismissKeyboard();
        yield put(showLoading(false));
    }

}

export function* watchSearchFriends() {
    yield takeLatest(types.SEARCH_FRIENDS, searchFriends);
}

export function* addFriend(action: any) {

    try {

        console.log(action);
        return true;

    } catch (e) {
        console.log(e);
    } finally {

    }

}

export function* watchAddFriend() {
    yield takeEvery(types.ADD_FRIEND, addFriend);
}

const friendsSaga = [
    fork(watchSearchFriends),
    fork(watchAddFriend),
];

export default friendsSaga;
