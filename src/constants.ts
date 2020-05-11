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

// Action Props
export const PROP_ACTION_TYPE = 'type';
export const PROP_ACTION_PAYLOAD = 'payload';

// Global State Properties
export const STATE_USER = 'user';
export const STATE_LESSONS = 'lessons';
export const PROP_DATA = 'data';
export const PROP_ERRORS = 'errors';
export const PROP_SELECTED_ITEM_ID = 'selectedItemId';
export const STATE_OPERATION = 'operation';
export const PROP_OPERATION_TYPE = 'operationType';
export const PROP_OPERATION_DATA = 'operationData';

/*****************************************************************************************/

/*****************************************************************************************/
/***************************************** Other *****************************************/
/*****************************************************************************************/

// Data Props
export const PROP_USER_ID = 'userId';
export const PROP_FIRST_NAME = 'firstName';
export const PROP_LAST_NAME = 'lastName';
export const PROP_EMAIL = 'email';
export const PROP_PASSWORD = 'password';
export const PROP_USER_TYPE = 'userType';

// User Types
export const TYPE_TEACHER = 'teacher';
export const TYPE_STUDENT = 'student';

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

// Component Related Props
export const PROP_IS_AUTHENTICATED_USER = 'isAuthenticatedUser';
export const PROP_IS_REGISTERED_USER = 'isRegisteredUser';

/*****************************************************************************************/
