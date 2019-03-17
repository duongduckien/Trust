import { all } from 'redux-saga/effects';
import commonSaga from './common.saga';
import loginSaga from './login.saga';

function* rootSaga() {
    yield all([
        ...commonSaga,
        ...loginSaga,
    ])
}

export default rootSaga;