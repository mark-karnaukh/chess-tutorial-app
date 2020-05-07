import { combineReducers } from 'redux';

export const rootReducer = combineReducers({
  user: (state = {}, action) => {
    return state;
  },
  lessons: (state = {}, action) => {
    return state;
  },
  operation: (state = {}, action) => {
    return state;
  },
});
