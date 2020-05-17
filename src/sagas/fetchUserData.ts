// Redux saga effects
import { takeLatest, put, delay, select } from 'redux-saga/effects';

// Libs
import moment from 'moment';

// Types
import { FetchUserDataAction, UserData } from '../types';

// Constants
import {
  ACTION_FETCH_USER_DATA,
  DB_USERS,
  ERRORS_SIGN_IN,
  PROP_NOTIFICATION_HEADER,
  PROP_NOTIFICATION_BODY,
  PROP_FORMATTED_DATE_TIME,
  PROP_WITH_AUTO_HIDE,
} from '../constants';

// Selectors
import { selectUserData$ } from '../selectors';

// Actions
import {
  onPutUserData,
  onToggleUserDataLoading,
  onPutAuthRequestError,
  onPutNotification,
} from '../actions';

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

  yield put(onToggleUserDataLoading());
  yield delay(1000);

  try {
    const userDataDoc = yield fireStore.collection(DB_USERS).doc(userId).get();

    yield put(onPutUserData(userDataDoc.data() as UserData));
  } catch (error) {
    yield put(onPutAuthRequestError(ERRORS_SIGN_IN, error));
  } finally {
    yield put(onToggleUserDataLoading());
  }

  const userData = yield select(selectUserData$);

  if (!!Object.entries(userData).length) {
    const { firstName, lastName } = userData as UserData;

    yield put(
      onPutNotification({
        [PROP_NOTIFICATION_HEADER]: 'Signed In Successfully',
        [PROP_NOTIFICATION_BODY]: `Welcome ${firstName} ${lastName}`,
        [PROP_FORMATTED_DATE_TIME]: moment().format('DD/MM/YYYY HH:mm'),
        [PROP_WITH_AUTO_HIDE]: true,
      })
    );
  }
}
