// Redux saga effects
import { takeLatest } from 'redux-saga/effects';

// Types
import { SignInAction } from '../types';

// Constants
import { ACTION_SIGN_IN } from '../constants';

// Firebase
import { auth as firebaseAuth } from '../firebase';

// Watcher saga
export function* onWatchSignIn() {
  yield takeLatest(ACTION_SIGN_IN, onHandleSignIn);
}

// Worker saga
export function* onHandleSignIn(action: SignInAction) {
  const {
    payload: { email, password },
  } = action;

  try {
    yield firebaseAuth.signInWithEmailAndPassword(email, password);
  } catch (error) {
    console.log(error);
  }
}
