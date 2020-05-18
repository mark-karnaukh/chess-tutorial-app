/*****************************************************************************************/
/*************************************** Fire Base ***************************************/
/*****************************************************************************************/

// Fire Base Config Properties
export const PROP_API_KEY = 'apiKey';
export const PROP_AUTH_DOMAIN = 'authDomain';
export const PROP_DATABASE_URL = 'databaseURL';
export const PROP_PROJECT_ID = 'projectId';
export const PROP_STORAGE_BUCKET = 'storageBucket';
export const PROP_MESSAGING_SENDER_ID = 'messagingSenderId';
export const PROP_APP_ID = 'appId';

// Fire Store Database Name
export const DB_USERS = 'users';
export const DB_LESSONS = 'lessons';

/*****************************************************************************************/
/***************************************** Redux *****************************************/
/*****************************************************************************************/

// Action Types
export const ACTION_SIGN_IN = 'SIGN_IN';
export const ACTION_SIGN_UP = 'SIGN_UP';
export const ACTION_SIGN_OUT = 'SIGN_OUT';
export const ACTION_SUBMIT_USER_DATA = 'SUBMIT_USER_DATA';
export const ACTION_FETCH_USER_DATA = 'FETCH_USER_DATA';
export const ACTION_PUT_USER_DATA = 'PUT_USER_DATA';
export const ACTION_CLEAR_USER_DATA = 'CLEAR_USER_DATA';
export const ACTION_TOGGLE_USER_DATA_LOADING = 'TOGGLE_USER_DATA_LOADING';
export const ACTION_PUT_AUTH_REQUEST_ERROR = 'PUT_AUTH_REQUEST_ERROR';
export const ACTION_CLEAR_AUTH_REQUEST_ERRORS = 'CLEAR_AUTH_REQUEST_ERRORS';
export const ACTION_PUT_NOTIFICATION = 'PUT_NOTIFICATION';
export const ACTION_CLEAR_NOTIFICATION = 'CLEAR_NOTIFICATION';
export const ACTION_CREATE_LESSON = 'CREATE_LESSON';
export const ACTION_UPDATE_LESSON = 'UPDATE_LESSON';
export const ACTION_DELETE_LESSON = 'DELETE_LESSON';
export const ACTION_DISCARD_OPERATION = 'DISCARD_OPERATION';

// Action Props
export const PROP_ACTION_TYPE = 'type';
export const PROP_ACTION_PAYLOAD = 'payload';

// Global State Properties
export const STATE_USER = 'user';
export const STATE_LESSONS = 'lessons';
export const PROP_DATA = 'data';
export const PROP_ERRORS = 'errors';
export const PROP_SELECTED_LESSON_ID = 'selectedLessonId';
export const STATE_OPERATION = 'operation';
export const PROP_OPERATION_TYPE = 'operationType';
export const PROP_OPERATION_DATA = 'operationData';
export const STATE_NOTIFICATION = 'notification';

/*****************************************************************************************/

/*****************************************************************************************/
/***************************************** Other *****************************************/
/*****************************************************************************************/

// User Data Props
export const PROP_USER_ID = 'userId';
export const PROP_FIRST_NAME = 'firstName';
export const PROP_LAST_NAME = 'lastName';
export const PROP_EMAIL = 'email';
export const PROP_PASSWORD = 'password';
export const PROP_USER_TYPE = 'userType';

// Lesson Data Props
export const PROP_ID = 'id';
export const PROP_TITLE = 'title';
export const PROP_DESCRIPTION = 'description';
export const PROP_INITIAL_BOARD_POSITION = 'initialBoardPosition';
export const PROP_CHECK_MOVES = 'checkMoves';
export const PROP_CREATED_BY = 'createdBy';
export const PROP_CREATED_AT = 'createdAt';

// User Types
export const TYPE_TEACHER = 'teacher';
export const TYPE_STUDENT = 'student';

// Chess Moves
export const PROP_SOURCE_SQUARE = 'sourceSquare';
export const PROP_TARGET_SQUARE = 'targetSquare';
export const PROP_PIECE = 'piece';
export const PROP_FEN_STRING = 'fenStr';
export const PROP_FROM = 'from';
export const PROP_TO = 'to';

// Operation
export const PROP_OPERATION_CREATE = 'create';
export const PROP_OPERATION_UPDATE = 'update';

export const NEW_CREATE_OPERATION = {
  [PROP_OPERATION_TYPE]: PROP_OPERATION_CREATE as 'create',
  [PROP_OPERATION_DATA]: {
    [PROP_TITLE]: '',
    [PROP_DESCRIPTION]: '',
    [PROP_INITIAL_BOARD_POSITION]: '',
    [PROP_CHECK_MOVES]: [],
    [PROP_CREATED_BY]: null,
    [PROP_CREATED_AT]: null,
  },
};

// Network Request Errors
export const ERRORS_SIGN_IN = 'errorsSignIn';
export const ERRORS_SIGN_UP = 'errorsSignUp';

export const PROP_ERROR_CODE = 'code';
export const PROP_ERROR_MESSAGE = 'message';

// Routes
export const ROUTE_PATH_DEFAULT = '/';
export const ROUTE_PATH_AUTH = '/auth';
export const ROUTE_PATH_LESSONS = '/lessons';
export const ROUTE_PATH_PROFILE = '/profile';

// Notification
export const PROP_NOTIFICATION_HEADER = 'notificationHeader';
export const PROP_NOTIFICATION_BODY = 'notificationBody';
export const PROP_WITH_AUTO_HIDE = 'withAutoHide';
export const PROP_FORMATTED_DATE_TIME = 'formattedDateTime';
export const PROP_DELAY_TIME = 'delayTime';

// Component Related Props
export const PROP_IS_AUTHENTICATED = 'isAuthenticated';
export const PROP_IS_REGISTERED = 'isRegistered';
export const PROP_IS_VALIDATED = 'isValidated';
export const PROP_IS_ADD_EDIT_MODE = 'isAddEditMode';
export const PROP_IS_OPEN = 'isOpen';
export const PROP_IS_LOADING = 'isLoading';
export const PROP_CURRENT_LOCATION_PATH = 'currentLocationPath';
export const PROP_COMPONENT = 'component';
export const PROP_NEW_CHECK_MOVE = 'newCheckMove';
export const PROP_ACTUAL_BOARD_POSITION = 'actualBoardPosition';
export const PROP_LESSON_DATA = 'lessonData';
export const PROP_SELECTED_LESSON = 'selectedLesson';

// Default Global States
export const defaultUserState = {
  [PROP_ERRORS]: {
    [ERRORS_SIGN_IN]: [],
    [ERRORS_SIGN_UP]: [],
  },
  [PROP_DATA]: {},
  [PROP_IS_LOADING]: false,
};

export const defaultLessonsState = {
  [PROP_SELECTED_LESSON_ID]: null,
  [PROP_DATA]: [],
  [PROP_IS_LOADING]: false,
};

export const defaultOperationState = {
  [PROP_OPERATION_TYPE]: null,
  [PROP_OPERATION_DATA]: null,
};

/*****************************************************************************************/
