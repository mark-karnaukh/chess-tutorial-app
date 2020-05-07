// Imported constants
import {
  PROP_USER,
  PROP_LESSONS,
  PROP_OPERATION,
  PROP_OPERATION_DATA,
  PROP_OPERATION_TYPE,
  PROP_ERRORS,
  PROP_DATA,
  PROP_SELECTED_ITEM_ID,
} from './constants';

// Global state
export interface GlobalState {
  [PROP_USER]: {
    [PROP_ERRORS]: Array<any>;
    [PROP_DATA]: Object;
  };
  [PROP_LESSONS]: {
    [PROP_SELECTED_ITEM_ID]: number | null;
    [PROP_DATA]: Object;
    [PROP_ERRORS]: Array<any>;
  };
  [PROP_OPERATION]: {
    [PROP_OPERATION_TYPE]: string | null;
    [PROP_OPERATION_DATA]: Object;
  };
}
