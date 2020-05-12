// Redux saga effects
import { takeLatest, put } from 'redux-saga/effects';

// Types
import { SubmitUserDataAction } from '../types';

// Constants
import {
  ACTION_SUBMIT_USER_DATA,
  DB_USERS,
  ERRORS_SIGN_UP,
} from '../constants';

// Firebase
import { db as fireStore } from '../firebase';

// Actions
import { onToggleUserDataLoading, onPutAuthRequestError } from '../actions';

// Watcher saga
export function* onWatchSubmitUserData() {
  yield takeLatest(ACTION_SUBMIT_USER_DATA, onSubmitUserData);
}

// Worker saga
export function* onSubmitUserData(action: SubmitUserDataAction) {
  const {
    payload: { userId },
  } = action;

  yield put(onToggleUserDataLoading());

  try {
    yield fireStore.collection(DB_USERS).doc(userId).set(action.payload);
  } catch (error) {
    console.log(error);

    yield put(onPutAuthRequestError(ERRORS_SIGN_UP, error));
  } finally {
    yield put(onToggleUserDataLoading());
  }
}
