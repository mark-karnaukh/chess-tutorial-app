// Redux utils and types to setup a store configuration
import { applyMiddleware, createStore, Middleware } from 'redux';

// Middleware
import logger from 'redux-logger';

// Combined root reducer
import { rootReducer } from './reducers';

// Utils
import { composeWithDevTools } from 'redux-devtools-extension';

const isProductionMode = process.env.NODE_ENV === 'production';
let middleware = [] as Middleware[];

if (!isProductionMode) {
  middleware = [...middleware, logger];
}

const appliedMiddleware = applyMiddleware(...middleware);

export const initialState = {
  authenticatedUser: {},
  lessons: [],
  operation: {},
};

export const configureStore = () => {
  return createStore(
    rootReducer,
    initialState,
    isProductionMode
      ? appliedMiddleware
      : composeWithDevTools(appliedMiddleware)
  );
};
