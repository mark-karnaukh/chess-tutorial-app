// Types
import {
  OperationState,
  OperationStateActions,
  UpdateOperationDataActionPayload,
  LessonData,
} from '../types';

// Constants
import {
  ACTION_CREATE_LESSON,
  ACTION_DISCARD_OPERATION,
  ACTION_UPDATE_OPERATION_DATA,
  NEW_CREATE_OPERATION,
  PROP_OPERATION_DATA,
  PROP_CREATED_BY,
  defaultOperationState,
} from '../constants';

export function operationReducer(
  state: OperationState = defaultOperationState,
  action: OperationStateActions
): OperationState {
  const { type, payload } = action;

  switch (type) {
    case ACTION_CREATE_LESSON:
      const { operationData } = NEW_CREATE_OPERATION;

      return {
        ...NEW_CREATE_OPERATION,
        [PROP_OPERATION_DATA]: {
          ...operationData,
          [PROP_CREATED_BY]: payload as string,
        },
      };
    case ACTION_UPDATE_OPERATION_DATA:
      const [key, value] = Object.entries(
        payload as UpdateOperationDataActionPayload
      )[0];
      const { [PROP_OPERATION_DATA]: data } = state;

      return {
        ...state,
        [PROP_OPERATION_DATA]: {
          ...(data as LessonData),
          [key]: value,
        },
      };
    case ACTION_DISCARD_OPERATION:
      return defaultOperationState;
    default:
      return state;
  }
}
