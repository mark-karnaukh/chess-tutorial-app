// Redux saga effects
import { put, delay, takeLatest } from 'redux-saga/effects';

// Types
import { PutNotificationAction } from '../types';

// Constants
import { ACTION_PUT_NOTIFICATION } from '../constants';

// Actions
import { onClearNotification } from '../actions';

// Watcher saga
export function* onWatchPutNotification() {
  yield takeLatest(ACTION_PUT_NOTIFICATION, onShowNotification);
}

export function* onShowNotification(action: PutNotificationAction) {
  const {
    payload: { delayTime = 3000 },
  } = action;

  yield delay(delayTime);

  yield put(onClearNotification());
}
