// Utils
import { combineReducers } from 'redux';

// Constants
import {
  STATE_USER,
  STATE_LESSONS,
  STATE_OPERATION,
  STATE_NOTIFICATION,
} from '../constants';

// Reducers
import { userReducer } from './userReducer';
import { notificationReducer } from './notificationReducer';

export const rootReducer = combineReducers({
  [STATE_USER]: userReducer,
  [STATE_LESSONS]: (state = {}, action) => {
    return state;
  },
  [STATE_OPERATION]: (state = {}, action) => {
    return state;
  },
  [STATE_NOTIFICATION]: notificationReducer,
});
