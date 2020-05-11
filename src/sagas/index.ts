// Redux saga effects
import { all, fork } from 'redux-saga/effects';

// Sagas
import { onWatchSignIn } from './handleSignIn';
import { onWatchSignUp } from './handleSignUp';
import { onWatchSignOut } from './handleSignOut';
import { onWatchSubmitUserData } from './submitUserData';
import { onWatchFetchUserData } from './fetchUserData';

export const rootSaga = function* rootSaga() {
  yield all([
    fork(onWatchSignIn),
    fork(onWatchSignUp),
    fork(onWatchSignOut),
    fork(onWatchSubmitUserData),
    fork(onWatchFetchUserData),
  ]);
};
