import { all } from 'redux-saga/effects';
import commonSaga from './common.saga';
import authSaga from './auth.saga';
import chatSaga from './chat.saga';
import friendsSaga from './friends.saga';

function* rootSaga() {
    yield all([
        ...commonSaga,
        ...authSaga,
        ...chatSaga,
        ...friendsSaga,
    ])
}

export default rootSaga;