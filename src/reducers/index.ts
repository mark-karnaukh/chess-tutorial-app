// Utils
import { combineReducers } from 'redux';

// Reducers
import { userReducer } from './userReducer';

export const rootReducer = combineReducers({
  user: userReducer,
  lessons: (state = {}, action) => {
    return state;
  },
  operation: (state = {}, action) => {
    return state;
  },
});
