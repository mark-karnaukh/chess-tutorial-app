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
  PROP_IS_LOADING,
  PROP_NOTIFICATION_HEADER,
  PROP_NOTIFICATION_BODY,
  PROP_FORMATTED_DATE_TIME,
  PROP_DELAY_TIME,
  PROP_WITH_AUTO_HIDE,
  STATE_NOTIFICATION,
  PROP_SOURCE_SQUARE,
  PROP_TARGET_SQUARE,
  PROP_PIECE,
  PROP_FEN_STRING,
} from './constants';

// Imported types
import { Square } from 'chess.js';
import { Piece } from 'chessboardjsx';

// Global state
export interface UserState {
  [PROP_ERRORS]: {
    [ERRORS_SIGN_IN]: Array<AuthError>;
    [ERRORS_SIGN_UP]: Array<AuthError>;
  };
  [PROP_DATA]: UserDataActionPayload | {};
  [PROP_IS_LOADING]: boolean;
}

export interface LessonsState {
  [PROP_SELECTED_ITEM_ID]: number | null;
  [PROP_DATA]: Object;
  [PROP_ERRORS]: Array<any>;
  [PROP_IS_LOADING]: boolean;
}

export interface OperationState {
  [PROP_OPERATION_TYPE]: string | null;
  [PROP_OPERATION_DATA]: Object;
}

export type NotificationState = PutNotificationActionPayload | null;

export interface GlobalState {
  [STATE_USER]: UserState;
  [STATE_LESSONS]: LessonsState;
  [STATE_OPERATION]: OperationState;
  [STATE_NOTIFICATION]: NotificationState;
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

export type PutAuthRequestErrorActionPayload = Record<
  AuthErrorGroup,
  AuthError
>;

export interface PutNotificationActionPayload {
  [PROP_NOTIFICATION_HEADER]: string;
  [PROP_NOTIFICATION_BODY]: string;
  [PROP_FORMATTED_DATE_TIME]: string;
  [PROP_WITH_AUTO_HIDE]?: boolean;
  [PROP_DELAY_TIME]?: number;
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

export interface ToggleUserDataLoadingAction {
  [PROP_ACTION_TYPE]: 'TOGGLE_USER_DATA_LOADING';
  [PROP_ACTION_PAYLOAD]: undefined;
}

export interface PutAuthRequestErrorAction {
  [PROP_ACTION_TYPE]: 'PUT_AUTH_REQUEST_ERROR';
  [PROP_ACTION_PAYLOAD]: PutAuthRequestErrorActionPayload;
}

export interface ClearAuthRequestErrorsAction {
  [PROP_ACTION_TYPE]: 'CLEAR_AUTH_REQUEST_ERRORS';
  [PROP_ACTION_PAYLOAD]: undefined;
}

export type UserStateActions =
  | PutUserDataAction
  | PutAuthRequestErrorAction
  | ClearUserDataAction
  | ToggleUserDataLoadingAction
  | ClearAuthRequestErrorsAction;

export type NotificationStateActions =
  | PutNotificationAction
  | ClearNotificationAction;

export interface PutNotificationAction {
  [PROP_ACTION_TYPE]: 'PUT_NOTIFICATION';
  [PROP_ACTION_PAYLOAD]: PutNotificationActionPayload;
}

export interface ClearNotificationAction {
  [PROP_ACTION_TYPE]: 'CLEAR_NOTIFICATION';
  [PROP_ACTION_PAYLOAD]: undefined;
}

// Network request errors
export interface AuthError extends Error {
  [PROP_ERROR_CODE]: string;
  [PROP_ERROR_MESSAGE]: string;
}

// Chess Moves
export interface Move {
  [PROP_SOURCE_SQUARE]: Square;
  [PROP_TARGET_SQUARE]: Square;
  [PROP_PIECE]: Piece;
}

export interface CheckMove extends Move {
  [PROP_FEN_STRING]: string;
}

export type AuthErrorGroup = 'errorsSignIn' | 'errorsSignUp';
