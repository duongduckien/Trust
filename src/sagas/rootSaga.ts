import { all } from 'redux-saga/effects';
import commonSaga from './common.saga';
import loginSaga from './login.saga';
import chatSaga from './chat.saga';

function* rootSaga() {
    yield all([
        ...commonSaga,
        ...loginSaga,
        ...chatSaga,
    ])
}

export default rootSaga;