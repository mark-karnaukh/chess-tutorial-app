// Utils
import { createSelector } from 'reselect';

// Types
import { GlobalState, UserData } from './types';

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
  PROP_OPERATION_DATA,
  PROP_OPERATION_TYPE,
  PROP_SELECTED_LESSON_ID,
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
      !!(userData as UserData)[PROP_USER_ID]
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

export const selectOperationData$ = createSelector(
  selectOperationState$,
  (operationState) => operationState[PROP_OPERATION_DATA]
);

export const selectOperationType$ = createSelector(
  selectOperationState$,
  (operationState) => operationState[PROP_OPERATION_TYPE]
);

export const selectLessons$ = createSelector(
  selectLessonsState$,
  (lessonsState) => lessonsState[PROP_DATA]
);

export const getSelectedLessonItemId$ = createSelector(
  selectLessonsState$,
  (lessonsState) => lessonsState[PROP_SELECTED_LESSON_ID]
);

export const getSelectedLessonItem$ = createSelector(
  selectLessons$,
  getSelectedLessonItemId$,
  (lessons, selectedLessonId) => {
    const selectedLesson = lessons.find(({ id }) => id === selectedLessonId);

    return selectedLesson || null;
  }
);
