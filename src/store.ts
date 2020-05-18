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
  STATE_NOTIFICATION,
  defaultUserState,
  defaultLessonsState,
  defaultOperationState,
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
  [STATE_USER]: defaultUserState,
  [STATE_LESSONS]: defaultLessonsState,
  [STATE_OPERATION]: defaultOperationState,
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
