// Redux saga effects
import { takeLatest, put, select } from 'redux-saga/effects';

// Libs
import moment from 'moment';

// Types
import { DeleteLessonAction } from '../types';

// Constants
import {
  ACTION_DELETE_LESSON,
  DB_LESSONS,
  PROP_ERROR_CODE,
  PROP_ERROR_MESSAGE,
  PROP_NOTIFICATION_HEADER,
  PROP_NOTIFICATION_BODY,
  PROP_FORMATTED_DATE_TIME,
  PROP_DELAY_TIME,
} from '../constants';

// Firebase
import { db as fireStore } from '../firebase';

// Selectors
import { getSelectedLessonItemId$ } from '../selectors';

// Actions
import {
  onToggleLessonDataLoading,
  onPutNotification,
  onFetchLessonsData,
} from '../actions';

// Watcher saga
export function* onWatchDeleteLesson() {
  yield takeLatest(ACTION_DELETE_LESSON, onDeleteLesson);
}

// Worker saga
export function* onDeleteLesson(action: DeleteLessonAction) {
  yield put(onToggleLessonDataLoading());

  const selectedLessonId = yield select(getSelectedLessonItemId$);
  let isFailed = false;

  try {
    yield fireStore.collection(DB_LESSONS).doc(selectedLessonId).delete();
  } catch (error) {
    isFailed = true;

    yield put(
      onPutNotification({
        [PROP_NOTIFICATION_HEADER]: `Delete Lesson Error: ${error[PROP_ERROR_CODE]}!`,
        [PROP_NOTIFICATION_BODY]: error[PROP_ERROR_MESSAGE],
        [PROP_FORMATTED_DATE_TIME]: moment().format('DD/MM/YYYY HH:mm'),
        [PROP_DELAY_TIME]: 4000,
      })
    );
  } finally {
    yield put(onToggleLessonDataLoading());
  }

  if (!isFailed) {
    yield put(
      onPutNotification({
        [PROP_NOTIFICATION_HEADER]: `Lesson Delete Successful!`,
        [PROP_NOTIFICATION_BODY]: 'Lesson was deleted successfully.',
        [PROP_FORMATTED_DATE_TIME]: moment().format('DD/MM/YYYY HH:mm'),
        [PROP_DELAY_TIME]: 4000,
      })
    );

    yield put(onFetchLessonsData());
  }
}
