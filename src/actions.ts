// Constants
import {
  ACTION_LOG_IN,
  ACTION_SIGN_UP,
  ACTION_FETCH_USER_DATA,
  ACTION_SUBMIT_USER_DATA,
  ACTION_PUT_USER_DATA,
  PROP_ACTION_TYPE,
  PROP_ACTION_PAYLOAD,
} from './constants';

// Types
import {
  LogInAction,
  LogInActionPayload,
  SignUpAction,
  SignUpActionPayload,
  FetchUserDataAction,
  FetchUserDataActionPayload,
  SubmitUserDataAction,
  UserDataActionPayload,
} from './types';

export const onLogIn = (logInData: LogInActionPayload): LogInAction => {
  return {
    [PROP_ACTION_TYPE]: ACTION_LOG_IN,
    [PROP_ACTION_PAYLOAD]: logInData,
  };
};

export const onSignUp = (signUpData: SignUpActionPayload): SignUpAction => {
  return {
    [PROP_ACTION_TYPE]: ACTION_SIGN_UP,
    [PROP_ACTION_PAYLOAD]: signUpData,
  };
};

export const onFetchUserData = (
  userData: FetchUserDataActionPayload
): FetchUserDataAction => {
  return {
    [PROP_ACTION_TYPE]: ACTION_FETCH_USER_DATA,
    [PROP_ACTION_PAYLOAD]: userData,
  };
};

export const onSubmitUserData = (
  userData: UserDataActionPayload
): SubmitUserDataAction => {
  return {
    [PROP_ACTION_TYPE]: ACTION_SUBMIT_USER_DATA,
    [PROP_ACTION_PAYLOAD]: userData,
  };
};

export const onPutUserData = (userData: UserDataActionPayload) => {
  return {
    [PROP_ACTION_TYPE]: ACTION_PUT_USER_DATA,
    [PROP_ACTION_PAYLOAD]: userData,
  };
};
