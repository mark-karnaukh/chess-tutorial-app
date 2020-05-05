// Redux utils to setup a store configuration
import { createStore, applyMiddleware, Middleware } from 'redux';

// Middleware
import logger from 'redux-logger';

// Combined root reducer
import { rootReducer } from './reducers';

let middleware = [] as Middleware[];

if (process.env.NODE_ENV !== 'production') {
  middleware = [...middleware, logger];
}

export const configureStore = () => {
  return createStore(rootReducer, {}, applyMiddleware(...middleware));
};
