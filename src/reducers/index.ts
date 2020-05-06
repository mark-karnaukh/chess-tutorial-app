import { combineReducers } from 'redux';

export const rootReducer = combineReducers({
  authenticatedUser: (state = {}, action) => {
    return state;
  },
  lessons: (state = [], action) => {
    return state;
  },
  operation: (state = {}, action) => {
    return state;
  },
});
