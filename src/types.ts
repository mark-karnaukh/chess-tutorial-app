// Imported constants
import {
  STATE_USER,
  PROP_FIRST_NAME,
  PROP_LAST_NAME,
  PROP_EMAIL,
  PROP_PASSWORD,
  PROP_USER_TYPE,
  PROP_USER_ID,
  STATE_LESSONS,
  STATE_OPERATION,
  PROP_OPERATION_DATA,
  PROP_OPERATION_TYPE,
  PROP_ERRORS,
  ERRORS_SIGN_IN,
  ERRORS_SIGN_UP,
  PROP_ERROR_CODE,
  PROP_ERROR_MESSAGE,
  PROP_DATA,
  PROP_SELECTED_ITEM_ID,
  PROP_ACTION_TYPE,
  PROP_ACTION_PAYLOAD,
} from './constants';

// Global state
export interface UserState {
  [PROP_ERRORS]: {
    [ERRORS_SIGN_IN]: Array<AuthError>;
    [ERRORS_SIGN_UP]: Array<AuthError>;
  };
  [PROP_DATA]: UserDataActionPayload | {};
}

export interface LessonsState {
  [PROP_SELECTED_ITEM_ID]: number | null;
  [PROP_DATA]: Object;
  [PROP_ERRORS]: Array<any>;
}

export interface OperationState {
  [PROP_OPERATION_TYPE]: string | null;
  [PROP_OPERATION_DATA]: Object;
}

export interface GlobalState {
  [STATE_USER]: UserState;
  [STATE_LESSONS]: LessonsState;
  [STATE_OPERATION]: OperationState;
}

// Actions
export interface SignInActionPayload {
  [PROP_EMAIL]: string;
  [PROP_PASSWORD]: string;
}

export interface SignUpActionPayload {
  [PROP_FIRST_NAME]: string;
  [PROP_LAST_NAME]: string;
  [PROP_EMAIL]: string;
  [PROP_PASSWORD]: string;
  [PROP_USER_TYPE]: string;
}

export interface FetchUserDataActionPayload {
  [PROP_USER_ID]: string;
}

export interface UserDataActionPayload {
  [PROP_FIRST_NAME]: string;
  [PROP_LAST_NAME]: string;
  [PROP_EMAIL]: string;
  [PROP_USER_TYPE]: string;
  [PROP_USER_ID]: string;
}

export interface SignInAction {
  [PROP_ACTION_TYPE]: 'SIGN_IN';
  [PROP_ACTION_PAYLOAD]: SignInActionPayload;
}

export interface SignUpAction {
  [PROP_ACTION_TYPE]: 'SIGN_UP';
  [PROP_ACTION_PAYLOAD]: SignUpActionPayload;
}

export interface SignOutAction {
  [PROP_ACTION_TYPE]: 'SIGN_OUT';
  [PROP_ACTION_PAYLOAD]: undefined;
}

export interface FetchUserDataAction {
  [PROP_ACTION_TYPE]: 'FETCH_USER_DATA';
  [PROP_ACTION_PAYLOAD]: FetchUserDataActionPayload;
}

export interface SubmitUserDataAction {
  [PROP_ACTION_TYPE]: 'SUBMIT_USER_DATA';
  [PROP_ACTION_PAYLOAD]: UserDataActionPayload;
}

export interface PutUserDataAction {
  [PROP_ACTION_TYPE]: 'PUT_USER_DATA';
  [PROP_ACTION_PAYLOAD]: UserDataActionPayload;
}

export interface ClearUserDataAction {
  [PROP_ACTION_TYPE]: 'CLEAR_USER_DATA';
  [PROP_ACTION_PAYLOAD]: undefined;
}

export type UserStateActions = PutUserDataAction | ClearUserDataAction;

// Network request errors
export interface AuthError extends Error {
  [PROP_ERROR_CODE]: string;
  [PROP_ERROR_MESSAGE]: string;
}
