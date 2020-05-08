// Redux saga effects
import { takeLatest, put } from 'redux-saga/effects';

// Types
import { LogInAction } from '../types';

// Constants
import { ACTION_LOG_IN, PROP_USER_ID } from '../constants';

// Firebase
import { auth as firebaseAuth } from '../firebase';

// Actions
import { onFetchUserData } from '../actions';

// Watcher saga
export function* onWatchLogIn() {
  yield takeLatest(ACTION_LOG_IN, onHandleLogIn);
}

// Worker saga
export function* onHandleLogIn(action: LogInAction) {
  const {
    payload: { email, password },
  } = action;

  try {
    yield firebaseAuth.signInWithEmailAndPassword(email, password);

    yield put(
      onFetchUserData({
        [PROP_USER_ID]: firebaseAuth.currentUser?.uid as string,
      })
    );
  } catch (error) {
    console.log(error);
  }
}
