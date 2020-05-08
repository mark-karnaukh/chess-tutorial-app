// Redux saga effects
import { takeLatest, put } from 'redux-saga/effects';

// Types
import { FetchUserDataAction, UserDataActionPayload } from '../types';

// Constants
import { ACTION_FETCH_USER_DATA, DB_USERS } from '../constants';

// Actions
import { onPutUserData } from '../actions';

// Firebase
import { db as fireStore } from '../firebase';

// Watcher saga
export function* onWatchFetchUserData() {
  yield takeLatest(ACTION_FETCH_USER_DATA, onFetchUserData);
}

// Worker saga
export function* onFetchUserData(action: FetchUserDataAction) {
  const {
    payload: { userId },
  } = action;

  const userData = yield fireStore.collection(DB_USERS).doc(userId).get();

  yield put(onPutUserData(userData.data() as UserDataActionPayload));
}
