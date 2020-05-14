// Types
import {
  NotificationState,
  NotificationStateActions,
  PutNotificationActionPayload,
} from '../types';

// Constants
import {
  ACTION_PUT_NOTIFICATION,
  ACTION_CLEAR_NOTIFICATION,
} from '../constants';

export function notificationReducer(
  state: NotificationState = null,
  action: NotificationStateActions
): NotificationState {
  const { type, payload } = action;

  switch (type) {
    case ACTION_PUT_NOTIFICATION:
      return payload as PutNotificationActionPayload;
    case ACTION_CLEAR_NOTIFICATION:
      return null;
    default:
      return state;
  }
}
