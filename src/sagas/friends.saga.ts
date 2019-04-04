import { put, call, fork, takeLatest, takeEvery } from 'redux-saga/effects';
import { Actions } from 'react-native-router-flux';
import * as types from '../actions/types';
import { getFriendsSuccess, clearSearchFriends } from '../actions/friends.action';

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

        if (action.data.trim() !== '') {
            const result = yield call(friendsService.searchFriends, action.data);
            console.log(result);
            yield put(getFriendsSuccess(result));
            helper.dismissKeyboard();
        } else {
            yield put(clearSearchFriends());
        }

    } catch (err) {
        helper.dismissKeyboard();
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
