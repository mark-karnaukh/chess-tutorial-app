// Redux utils and types to setup a store configuration
import { applyMiddleware, createStore, Middleware } from 'redux';

// Middleware
import logger from 'redux-logger';

// Combined root reducer
import { rootReducer } from './reducers';

// Utils
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

// Root saga
import { rootSaga } from './sagas';

// Constants
import {
  STATE_USER,
  STATE_LESSONS,
  STATE_OPERATION,
  PROP_OPERATION_DATA,
  PROP_OPERATION_TYPE,
  PROP_ERRORS,
  PROP_DATA,
  PROP_SELECTED_ITEM_ID,
  ERRORS_SIGN_IN,
  ERRORS_SIGN_UP,
  PROP_IS_LOADING,
  STATE_NOTIFICATION,
} from './constants';

// Types
import { GlobalState } from './types';

const isProductionMode = process.env.NODE_ENV === 'production';
const sagaMiddleware = createSagaMiddleware();

let middleware = [sagaMiddleware] as Middleware[];

if (!isProductionMode) {
  middleware = [...middleware, logger];
}

const appliedMiddleware = applyMiddleware(...middleware);

export const initialState: GlobalState = {
  [STATE_USER]: {
    [PROP_ERRORS]: {
      [ERRORS_SIGN_IN]: [],
      [ERRORS_SIGN_UP]: [],
    },
    [PROP_DATA]: {},
    [PROP_IS_LOADING]: false,
  },
  [STATE_LESSONS]: {
    [PROP_SELECTED_ITEM_ID]: null,
    [PROP_DATA]: {},
    [PROP_ERRORS]: [],
    [PROP_IS_LOADING]: false,
  },
  [STATE_OPERATION]: {
    [PROP_OPERATION_TYPE]: null,
    [PROP_OPERATION_DATA]: {},
  },
  [STATE_NOTIFICATION]: null,
};

export const configureStore = () => {
  const store = createStore(
    rootReducer,
    initialState,
    isProductionMode
      ? appliedMiddleware
      : composeWithDevTools(appliedMiddleware)
  );

  sagaMiddleware.run(rootSaga);

  return store;
};
