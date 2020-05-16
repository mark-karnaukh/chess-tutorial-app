// Redux saga effects
import { takeLatest, put } from 'redux-saga/effects';

// Types
import { SignInAction } from '../types';

// Constants
import { ACTION_SIGN_IN, ERRORS_SIGN_IN } from '../constants';

// Actions
import {
  onToggleUserDataLoading,
  onPutAuthRequestError,
  onClearAuthRequestErrors,
} from '../actions';

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

  yield put(onToggleUserDataLoading());
  yield put(onClearAuthRequestErrors());

  try {
    yield firebaseAuth.signInWithEmailAndPassword(email, password);
  } catch (error) {
    yield put(onPutAuthRequestError(ERRORS_SIGN_IN, error));
  } finally {
    yield put(onToggleUserDataLoading());
  }
}
