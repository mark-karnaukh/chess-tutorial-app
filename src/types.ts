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
  PROP_SELECTED_LESSON_ID,
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
  PROP_ID,
  PROP_TITLE,
  PROP_DESCRIPTION,
  PROP_INITIAL_BOARD_POSITION,
  PROP_CHECK_MOVES,
  PROP_CREATED_BY,
  PROP_MODIFIED_AT,
} from './constants';

// Imported types
import { Square } from 'chess.js';
import { Piece } from 'chessboardjsx';

// Global state
export interface UserState {
  [PROP_ERRORS]: {
    [ERRORS_SIGN_IN]: Array<FirebaseError>;
    [ERRORS_SIGN_UP]: Array<FirebaseError>;
  };
  [PROP_DATA]: UserData | {};
  [PROP_IS_LOADING]: boolean;
}

export interface LessonsState {
  [PROP_SELECTED_LESSON_ID]: string | null;
  [PROP_DATA]: Array<LessonData>;
  [PROP_IS_LOADING]: boolean;
}

export interface OperationState {
  [PROP_OPERATION_TYPE]: OperationType | null;
  [PROP_OPERATION_DATA]: LessonData | null;
}

export type NotificationState = PutNotificationActionPayload | null;

export interface GlobalState {
  [STATE_USER]: UserState;
  [STATE_LESSONS]: LessonsState;
  [STATE_OPERATION]: OperationState;
  [STATE_NOTIFICATION]: NotificationState;
}

// Data Models
export interface UserData {
  [PROP_FIRST_NAME]: string;
  [PROP_LAST_NAME]: string;
  [PROP_EMAIL]: string;
  [PROP_USER_TYPE]: string;
  [PROP_USER_ID]: string;
}

export interface LessonData {
  [PROP_ID]?: string | null;
  [PROP_TITLE]: string;
  [PROP_DESCRIPTION]: string;
  [PROP_INITIAL_BOARD_POSITION]: string;
  [PROP_CHECK_MOVES]: Array<CheckMove>;
  [PROP_CREATED_BY]: string | null;
  [PROP_MODIFIED_AT]: string | null;
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

export type PutAuthRequestErrorActionPayload = Record<
  AuthErrorGroup,
  FirebaseError
>;

export type UpdateOperationDataActionPayload = Record<
  'title' | 'description' | 'initialBoardPosition' | 'checkMoves',
  string | CheckMove[]
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

export interface FetchLessonsDataAction {
  [PROP_ACTION_TYPE]: 'FETCH_LESSONS_DATA';
  [PROP_ACTION_PAYLOAD]: undefined;
}

export interface SelectLessonAction {
  [PROP_ACTION_TYPE]: 'SELECT_LESSON';
  [PROP_ACTION_PAYLOAD]: string;
}

export interface SubmitUserDataAction {
  [PROP_ACTION_TYPE]: 'SUBMIT_USER_DATA';
  [PROP_ACTION_PAYLOAD]: UserData;
}

export interface PutUserDataAction {
  [PROP_ACTION_TYPE]: 'PUT_USER_DATA';
  [PROP_ACTION_PAYLOAD]: UserData;
}

export interface PutLessonsDataAction {
  [PROP_ACTION_TYPE]: 'PUT_LESSONS_DATA';
  [PROP_ACTION_PAYLOAD]: LessonData[];
}

export interface ClearUserDataAction {
  [PROP_ACTION_TYPE]: 'CLEAR_USER_DATA';
  [PROP_ACTION_PAYLOAD]: undefined;
}

export interface ToggleUserDataLoadingAction {
  [PROP_ACTION_TYPE]: 'TOGGLE_USER_DATA_LOADING';
  [PROP_ACTION_PAYLOAD]: undefined;
}

export interface ToggleLessonDataLoadingAction {
  [PROP_ACTION_TYPE]: 'TOGGLE_LESSON_DATA_LOADING';
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

export interface CreateLessonAction {
  [PROP_ACTION_TYPE]: 'CREATE_LESSON';
  [PROP_ACTION_PAYLOAD]: string;
}

export interface DiscardOperationAction {
  [PROP_ACTION_TYPE]: 'DISCARD_OPERATION';
  [PROP_ACTION_PAYLOAD]: undefined;
}

export type UserStateActions =
  | PutUserDataAction
  | PutAuthRequestErrorAction
  | ClearUserDataAction
  | ToggleUserDataLoadingAction
  | ClearAuthRequestErrorsAction;

export type OperationStateActions =
  | CreateLessonAction
  | EditLessonAction
  | DiscardOperationAction
  | UpdateOperationDataAction;

export type LessonsStateActions =
  | ToggleLessonDataLoadingAction
  | PutLessonsDataAction
  | SelectLessonAction;

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

export interface UpdateOperationDataAction {
  [PROP_ACTION_TYPE]: 'UPDATE_OPERATION_DATA';
  [PROP_ACTION_PAYLOAD]: UpdateOperationDataActionPayload;
}

export interface DeleteLessonAction {
  [PROP_ACTION_TYPE]: 'DELETE_LESSON';
  [PROP_ACTION_PAYLOAD]: undefined;
}

export interface EditLessonAction {
  [PROP_ACTION_TYPE]: 'EDIT_LESSON';
  [PROP_ACTION_PAYLOAD]: LessonData;
}

export interface SubmitLessonDataAction {
  [PROP_ACTION_TYPE]: 'SUBMIT_LESSON_DATA';
  [PROP_ACTION_PAYLOAD]: undefined;
}

// Network request errors
export interface FirebaseError extends Error {
  [PROP_ERROR_CODE]: string;
  [PROP_ERROR_MESSAGE]: string;
}

export type AuthErrorGroup = 'errorsSignIn' | 'errorsSignUp';

// Chess Moves
export interface Move {
  [PROP_SOURCE_SQUARE]: Square;
  [PROP_TARGET_SQUARE]: Square;
  [PROP_PIECE]: Piece;
}

export interface CheckMove extends Move {
  [PROP_FEN_STRING]: string;
}

// Operation
export type OperationType = 'create' | 'update';
