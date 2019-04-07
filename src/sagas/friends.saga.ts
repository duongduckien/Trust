import { put, call, fork, takeLatest, takeEvery } from 'redux-saga/effects';
import { Actions } from 'react-native-router-flux';
import * as types from '../actions/types';
import { getFriendsSuccess, clearSearchFriends } from '../actions/friends.action';
import { showLoading, showAlertDialog } from '../actions/common.action';

// Languages
import { strings } from '../utilities/i18n';

// Utilities
import helper from '../utilities/helper';
import storage from '../utilities/storage';

// Services
import authService from '../services/auth.service';
import userService from '../services/user.service';
import friendsService from '../services/friends.service';

// Interfaces
import { IFriendData } from '../interfaces/friend.interface';

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

        const userStored = yield storage.getItem('user');
        const currentUser = JSON.parse(userStored);
        const userID = action.data.id;
        const keyUser = action.data.key;

        const friendData = yield call(friendsService.getFriendData, keyUser);

        const friendStore: IFriendData = {
            keyData: keyUser,
            userData: friendData,
            requestUser: currentUser.userId,
            accepted: 0,
            timeRequest: helper.getTime(),
            timeAccepted: 0,
        }

        const params = {
            child: currentUser.userId,
            subChild: keyUser,
            data: friendStore,
        }

        yield call(friendsService.createFriend, params);
        yield put(showAlertDialog({
            show: true,
            message: strings('ADD_FRIEND_SUCCESS'),
            confirmText: strings('OK'),
        }));

    } catch (e) {
        console.log(e);
        yield put(showAlertDialog({
            show: true,
            message: strings('SOMETHING_WENT_WRONG'),
            confirmText: strings('OK'),
        }));
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
