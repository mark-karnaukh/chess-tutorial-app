// Types
import { UserState, UserStateActions } from '../types';

// Constants
import {
  ACTION_PUT_USER_DATA,
  ACTION_CLEAR_USER_DATA,
  PROP_DATA,
  PROP_ERRORS,
  ERRORS_SIGN_IN,
  ERRORS_SIGN_UP,
} from '../constants';

export function userReducer(
  state: UserState = {
    [PROP_DATA]: {},
    [PROP_ERRORS]: { [ERRORS_SIGN_IN]: [], [ERRORS_SIGN_UP]: [] },
  } as UserState,
  action: UserStateActions
): UserState {
  const { type, payload = {} } = action;

  if ([ACTION_PUT_USER_DATA, ACTION_CLEAR_USER_DATA].includes(type)) {
    return { ...state, [PROP_DATA]: payload };
  }

  return state;
}
