// Redux saga effects
import { takeLatest, put } from 'redux-saga/effects';

// Types
import { SignUpAction, UserDataActionPayload as UserData } from '../types';

// Constants
import {
  ACTION_SIGN_UP,
  PROP_ACTION_PAYLOAD,
  PROP_USER_ID,
  PROP_PASSWORD,
  ERRORS_SIGN_UP,
} from '../constants';

// Firebase
import { auth as firebaseAuth } from '../firebase';

// Actions
import {
  onSignIn,
  onSubmitUserData,
  onToggleUserDataLoading,
  onPutAuthRequestError,
  onClearAuthRequestErrors,
} from '../actions';

// Watcher saga
export function* onWatchSignUp() {
  yield takeLatest(ACTION_SIGN_UP, onHandleSignUp);
}

// Worker saga
function* onHandleSignUp(action: SignUpAction) {
  const {
    payload: { email, password },
  } = action;

  yield put(onToggleUserDataLoading());
  yield put(onClearAuthRequestErrors());

  try {
    yield firebaseAuth.createUserWithEmailAndPassword(email, password);

    yield put(onSignIn({ email, password: password }));

    const userId = firebaseAuth.currentUser?.uid;

    yield put(
      onSubmitUserData({
        ...Object.fromEntries(
          Object.entries(action[PROP_ACTION_PAYLOAD]).filter(
            (entry) => entry[0] !== PROP_PASSWORD
          )
        ),
        [PROP_USER_ID]: userId,
      } as UserData)
    );
  } catch (error) {
    yield put(onPutAuthRequestError(ERRORS_SIGN_UP, error));
  } finally {
    yield put(onToggleUserDataLoading());
  }
}
