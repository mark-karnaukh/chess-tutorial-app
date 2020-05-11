// Utils
import { createSelector } from 'reselect';

// Types
import { GlobalState, UserDataActionPayload } from './types';

// Constants
import {
  STATE_USER,
  STATE_LESSONS,
  STATE_OPERATION,
  PROP_ERRORS,
  ERRORS_SIGN_IN,
  ERRORS_SIGN_UP,
  PROP_DATA,
  PROP_USER_ID,
} from './constants';

// General global state selectors
export const selectUserState$ = (state: GlobalState) => state[STATE_USER];
export const selectLessonsState$ = (state: GlobalState) => state[STATE_LESSONS];
export const selectOperationState$ = (state: GlobalState) =>
  state[STATE_OPERATION];

// User state selectors
export const selectUserAuthErrors$ = createSelector(
  selectUserState$,
  (userState) => userState[PROP_ERRORS]
);

export const selectUserData$ = createSelector(
  selectUserState$,
  (userState) => userState[PROP_DATA]
);

export const isAuthenticatedUser$ = createSelector(
  selectUserData$,
  selectUserAuthErrors$,
  (userData, userAuthErrors) => {
    const {
      [ERRORS_SIGN_IN]: signInErrors,
      [ERRORS_SIGN_UP]: signUpErrors,
    } = userAuthErrors;

    return (
      !signInErrors.length &&
      !signUpErrors.length &&
      !!(userData as UserDataActionPayload)[PROP_USER_ID]
    );
  }
);
