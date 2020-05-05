import { combineReducers } from 'redux';

export const rootReducer = combineReducers({
  someReducer: () => {
    return { prop: 'hello' };
  },
});
