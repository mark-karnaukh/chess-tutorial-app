// Libs
import moment from 'moment';

// Redux saga effects
import { takeLatest, put } from 'redux-saga/effects';

// Types
import { SignOutAction } from '../types';

// Constants
import {
  ACTION_SIGN_OUT,
  PROP_NOTIFICATION_HEADER,
  PROP_NOTIFICATION_BODY,
  PROP_FORMATTED_DATE_TIME,
  PROP_DELAY_TIME,
  PROP_ERROR_MESSAGE,
  PROP_ERROR_CODE,
} from '../constants';

// Actions
import { onClearUserData, onPutNotification } from '../actions';

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
    yield put(
      onPutNotification({
        [PROP_NOTIFICATION_HEADER]: `Sign Out Error: ${error[PROP_ERROR_CODE]}!`,
        [PROP_NOTIFICATION_BODY]: error[PROP_ERROR_MESSAGE],
        [PROP_FORMATTED_DATE_TIME]: moment().format('DD/MM/YYYY HH:mm'),
        [PROP_DELAY_TIME]: 4000,
      })
    );
  }
}
