import { put, call, fork, takeLatest, takeEvery } from 'redux-saga/effects';
import _ from 'lodash';
import * as types from '../actions/types';
import { 
    getFriendsSuccess,
    clearSearchFriends,
    removeFriendAddSuccess,
    getListFriendsAddedSuccess,
} from '../actions/friends.action';
import { showLoading, showAlertDialog } from '../actions/common.action';

// Languages
import { strings } from '../utilities/i18n';

// Utilities
import helper from '../utilities/helper';
import storage from '../utilities/storage';

// Services
import friendsService from '../services/friends.service';

// Interfaces
import { IFriendData } from '../interfaces/friend.interface';
import { ICurrentUser } from '../interfaces/user.interface';

export function* searchFriends(action: any) {

    try {

        yield put(showLoading(true));

        if (action.data.trim() !== '') {

            // Get current user
            const userStored = yield storage.getItem('user');
            const currentUser: ICurrentUser = JSON.parse(userStored);

            // Result of search data
            const result = yield call(friendsService.searchFriends, action.data);

            // Get list friends
            const friends = yield call(friendsService.getListKeysFriends, currentUser.userId.toString());

            if (friends.length > 0) {
                if (result.length > 0) {
                    _.remove(result, (el: any) => {
                        return (friends.indexOf(el.$key) !== -1);
                    });
                }
            }

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
        const currentTime = helper.getTime();

        const userStored = yield storage.getItem('user');
        const currentUser: ICurrentUser = JSON.parse(userStored);
        const userID = action.data.id;
        const keyUser = action.data.key;

        // Create data for current user
        const friendData = yield call(friendsService.getFriendData, keyUser);
        const friendStore: IFriendData = {
            keyData: keyUser,
            userData: friendData,
            requestUser: currentUser.userId,
            accepted: 0,
            timeRequest: currentTime,
            timeAccepted: 0,
        }
        const friendParams = {
            child: currentUser.userId,
            subChild: keyUser,
            data: friendStore,
        }

        // Create data for friend
        const currentUserData = yield call(friendsService.getFriendData, currentUser.$key);
        const currentUserStore: IFriendData = {
            keyData: currentUser.$key,
            userData: currentUserData,
            requestUser: currentUser.userId,
            accepted: 0,
            timeRequest: currentTime,
            timeAccepted: 0,
        }
        const currentUserParams = {
            child: friendData.userId,
            subChild: currentUser.$key,
            data: currentUserStore,
        }

        yield call(friendsService.createFriend, friendParams);
        yield call(friendsService.createFriend, currentUserParams);

        // Show alert add success
        yield put(showAlertDialog({
            show: true,
            message: strings('ADD_FRIEND_SUCCESS'),
            confirmText: strings('OK'),
        }));

        // Remove user from list friend
        yield put(removeFriendAddSuccess(userID));

    } catch (e) {

        console.log(e);

        // Show alert error
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

export function* getListFriendsAdded() {

    try {

        yield put(showLoading(true));

        const userStored = yield storage.getItem('user');
        const currentUser: ICurrentUser = JSON.parse(userStored);

        // Get list friends
        const friends = yield call(friendsService.getListFriends, currentUser.userId.toString());
        yield put(getListFriendsAddedSuccess(friends));

    } catch (e) {
        console.log(e);
    } finally {
        yield put(showLoading(false));
    }

}

export function* watchGetListFriendsAdded() {
    yield takeEvery(types.GET_LIST_FRIENDS_ADDED, getListFriendsAdded);
}

export function* acceptFriend(action: any) {

    try {

        console.log(action);
        return true;

    } catch (e) {
        console.log(e);
    } finally {

    }

}

export function* watchAcceptFriend() {
    yield takeEvery(types.ACCEPT_FRIEND, acceptFriend);
}

const friendsSaga = [
    fork(watchSearchFriends),
    fork(watchAddFriend),
    fork(watchGetListFriendsAdded),
    fork(watchAcceptFriend),
];

export default friendsSaga;
