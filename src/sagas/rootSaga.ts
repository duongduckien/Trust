import { all } from 'redux-saga/effects';
import { watchShowLoading } from './common.saga';

function* rootSaga() {
    yield all([
        watchShowLoading(),
    ])
}

export default rootSaga;