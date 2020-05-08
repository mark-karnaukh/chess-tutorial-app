// Redux saga effects
import { all, fork } from 'redux-saga/effects';

// Sagas
import { onWatchLogIn } from './handleLogIn';
import { onWatchSignUp } from './handleSignUp';
import { onWatchSubmitUserData } from './submitUserData';
import { onWatchFetchUserData } from './fetchUserData';

export const rootSaga = function* rootSaga() {
  yield all([
    fork(onWatchLogIn),
    fork(onWatchSignUp),
    fork(onWatchSubmitUserData),
    fork(onWatchFetchUserData),
  ]);
};
