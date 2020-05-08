// Redux saga effects
import { takeLatest } from 'redux-saga/effects';

// Types
import { SubmitUserDataAction } from '../types';

// Constants
import { ACTION_SUBMIT_USER_DATA, DB_USERS } from '../constants';

// Firebase
import { db as fireStore } from '../firebase';

// Watcher saga
export function* onWatchSubmitUserData() {
  yield takeLatest(ACTION_SUBMIT_USER_DATA, onSubmitUserData);
}

// Worker saga
export function* onSubmitUserData(action: SubmitUserDataAction) {
  const {
    payload: { userId },
  } = action;

  try {
    yield yield fireStore.collection(DB_USERS).doc(userId).set(action.payload);
  } catch (error) {
    console.log(error);
  }
}
