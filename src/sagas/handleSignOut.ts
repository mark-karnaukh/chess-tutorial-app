// Redux saga effects
import { takeLatest, put } from 'redux-saga/effects';

// Types
import { SignOutAction } from '../types';

// Constants
import { ACTION_SIGN_OUT } from '../constants';

// Actions
import { onClearUserData } from '../actions';

// Firebase
import { auth as firebaseAuth } from '../firebase';

// Watcher saga
export function* onWatchSignOut() {
  yield takeLatest(ACTION_SIGN_OUT, onHandleSignOut);
}

// Worker saga
export function* onHandleSignOut(action: SignOutAction) {
  try {
    const { currentUser } = firebaseAuth;

    if (!!currentUser) {
      yield firebaseAuth.signOut();

      yield put(onClearUserData());
    }
  } catch (error) {
    console.log(error);
  }
}
