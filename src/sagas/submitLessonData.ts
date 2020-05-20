// Redux saga effects
import { takeLatest, put, select } from 'redux-saga/effects';

// Libs
import moment from 'moment';

// Types
import { SubmitLessonDataAction, LessonData } from '../types';

// Constants
import {
  ACTION_SUBMIT_LESSON_DATA,
  DB_LESSONS,
  PROP_OPERATION_CREATE,
  PROP_OPERATION_UPDATE,
  PROP_NOTIFICATION_HEADER,
  PROP_NOTIFICATION_BODY,
  PROP_FORMATTED_DATE_TIME,
  PROP_DELAY_TIME,
  PROP_ERROR_CODE,
  PROP_ERROR_MESSAGE,
  PROP_MODIFIED_AT,
} from '../constants';

// Firebase
import { db as fireStore } from '../firebase';

// Actions
import {
  onToggleLessonDataLoading,
  onPutNotification,
  onFetchLessonsData,
  onDiscardOperation,
} from '../actions';

// Selectors
import { selectOperationState$ } from '../selectors';

// Watcher saga
export function* onWatchSubmitLessonData() {
  yield takeLatest(ACTION_SUBMIT_LESSON_DATA, onSubmitLessonData);
}

// Worker saga
export function* onSubmitLessonData(action: SubmitLessonDataAction) {
  const { operationType, operationData } = yield select(selectOperationState$);
  let isFailed = false;

  yield put(onToggleLessonDataLoading());

  try {
    if (operationType === PROP_OPERATION_CREATE) {
      yield fireStore.collection(DB_LESSONS).add({
        ...(operationData as LessonData),
        [PROP_MODIFIED_AT]: moment().format(),
      });
    }

    if (operationType === PROP_OPERATION_UPDATE) {
      const { id, ...lessonData } = operationData as LessonData;

      yield fireStore
        .collection(DB_LESSONS)
        .doc(id as string)
        .set({ ...lessonData, [PROP_MODIFIED_AT]: moment().format() });
    }
  } catch (error) {
    isFailed = true;

    yield put(
      onPutNotification({
        [PROP_NOTIFICATION_HEADER]: `${
          operationType === PROP_OPERATION_CREATE
            ? 'Lesson Create Error:'
            : 'Lesson Update Error:'
        } ${error[PROP_ERROR_CODE]}!`,
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
        [PROP_NOTIFICATION_HEADER]: `${
          operationType === PROP_OPERATION_CREATE
            ? 'Lesson Create Success'
            : 'Lesson Update Success'
        }!`,
        [PROP_NOTIFICATION_BODY]: `Lesson ${
          operationType === PROP_OPERATION_CREATE ? 'created' : 'updated'
        } successfully!`,
        [PROP_FORMATTED_DATE_TIME]: moment().format('DD/MM/YYYY HH:mm'),
        [PROP_DELAY_TIME]: 4000,
      })
    );

    yield put(onDiscardOperation());

    yield put(onFetchLessonsData());
  }
}
