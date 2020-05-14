// Utils
import { createSelector } from 'reselect';

// Types
import { GlobalState, UserDataActionPayload } from './types';

// Constants
import {
  STATE_USER,
  STATE_LESSONS,
  STATE_OPERATION,
  STATE_NOTIFICATION,
  PROP_ERRORS,
  ERRORS_SIGN_IN,
  ERRORS_SIGN_UP,
  PROP_DATA,
  PROP_USER_ID,
  PROP_IS_LOADING,
} from './constants';

// General global state selectors
export const selectUserState$ = (state: GlobalState) => state[STATE_USER];
export const selectLessonsState$ = (state: GlobalState) => state[STATE_LESSONS];
export const selectOperationState$ = (state: GlobalState) =>
  state[STATE_OPERATION];
export const selectNotification$ = (state: GlobalState) =>
  state[STATE_NOTIFICATION];

// User state selectors
export const selectAuthRequestErrors$ = createSelector(
  selectUserState$,
  (userState) => userState[PROP_ERRORS]
);

export const selectSignInAuthErrors$ = createSelector(
  selectAuthRequestErrors$,
  (authRequestErrors) => authRequestErrors[ERRORS_SIGN_IN]
);

export const selectSignUpAuthErrors$ = createSelector(
  selectAuthRequestErrors$,
  (authRequestErrors) => authRequestErrors[ERRORS_SIGN_UP]
);

export const selectUserData$ = createSelector(
  selectUserState$,
  (userState) => userState[PROP_DATA]
);

export const isAuthenticated$ = createSelector(
  selectUserData$,
  selectSignInAuthErrors$,
  selectSignUpAuthErrors$,
  (userData, signInAuthErrors, signUpAuthErrors) => {
    return (
      !signInAuthErrors.length &&
      !signUpAuthErrors.length &&
      !!(userData as UserDataActionPayload)[PROP_USER_ID]
    );
  }
);

export const isLoading$ = createSelector(
  selectUserState$,
  selectLessonsState$,
  (userState, lessonsState) => {
    const { [PROP_IS_LOADING]: isUserDataLoading } = userState;
    const { [PROP_IS_LOADING]: isLessonsDataLoading } = lessonsState;

    return isUserDataLoading || isLessonsDataLoading;
  }
);
