// Types
import {
  UserState,
  UserStateActions,
  FirebaseError,
  AuthErrorGroup,
} from '../types';

// Constants
import {
  ACTION_PUT_USER_DATA,
  ACTION_CLEAR_USER_DATA,
  ACTION_TOGGLE_USER_DATA_LOADING,
  ACTION_PUT_AUTH_REQUEST_ERROR,
  ACTION_CLEAR_AUTH_REQUEST_ERRORS,
  PROP_DATA,
  PROP_ERRORS,
  ERRORS_SIGN_IN,
  ERRORS_SIGN_UP,
  PROP_IS_LOADING,
  defaultUserState,
} from '../constants';

export function userReducer(
  state: UserState = defaultUserState as UserState,
  action: UserStateActions
): UserState {
  const { type, payload = {} } = action;

  if ([ACTION_PUT_USER_DATA, ACTION_CLEAR_USER_DATA].includes(type)) {
    return { ...state, [PROP_DATA]: payload };
  }

  if (type === ACTION_TOGGLE_USER_DATA_LOADING) {
    const { isLoading } = state;

    return { ...state, [PROP_IS_LOADING]: !isLoading };
  }

  if (type === ACTION_PUT_AUTH_REQUEST_ERROR) {
    const { errors } = state;
    const [payloadKey, payloadValue] = Object.entries(payload)[0];

    const updatedErrorsGroup = Array.from(
      new Set(
        [
          ...(errors[payloadKey as AuthErrorGroup] as FirebaseError[]),
          payloadValue,
        ].map((error) => JSON.stringify(error))
      )
    ).map((stringifiedError) => JSON.parse(stringifiedError));

    return {
      ...state,
      [PROP_ERRORS]: {
        ...errors,
        [payloadKey]: [...updatedErrorsGroup],
      },
    };
  }

  if (type === ACTION_CLEAR_AUTH_REQUEST_ERRORS) {
    return {
      ...state,
      [PROP_ERRORS]: { [ERRORS_SIGN_IN]: [], [ERRORS_SIGN_UP]: [] },
    };
  }

  return state;
}
