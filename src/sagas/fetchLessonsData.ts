// Redux saga effects
import { takeLatest, put, delay, select } from 'redux-saga/effects';

// Libs
import moment from 'moment';

// Types
import { FetchUserDataAction, LessonData } from '../types';

// Constants
import {
  ACTION_FETCH_LESSONS_DATA,
  PROP_USER_TYPE,
  PROP_USER_ID,
  DB_LESSONS,
  TYPE_TEACHER,
  PROP_CREATED_BY,
  PROP_ID,
  PROP_NOTIFICATION_HEADER,
  PROP_NOTIFICATION_BODY,
  PROP_FORMATTED_DATE_TIME,
  PROP_DELAY_TIME,
  PROP_MODIFIED_AT,
  PROP_ERROR_CODE,
  PROP_ERROR_MESSAGE,
} from '../constants';

// Selectors
import { selectUserData$ } from '../selectors';

// Actions
import {
  onToggleLessonDataLoading,
  onPutNotification,
  onSelectLesson,
  onPutLessonsData,
} from '../actions';

// Firebase
import { db as fireStore } from '../firebase';

// Watcher saga
export function* onWatchFetchLessonsData() {
  yield takeLatest(ACTION_FETCH_LESSONS_DATA, onFetchLessonsData);
}

// Worker saga
export function* onFetchLessonsData(action: FetchUserDataAction) {
  yield put(onToggleLessonDataLoading());

  const userData = yield select(selectUserData$);

  yield delay(1000);

  try {
    let lessons: LessonData[] = [];

    if (userData[PROP_USER_TYPE] === TYPE_TEACHER) {
      yield fireStore
        .collection(DB_LESSONS)
        .where(PROP_CREATED_BY, '==', userData[PROP_USER_ID])
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            lessons = [
              ...lessons,
              { [PROP_ID]: doc.id, ...doc.data() } as LessonData,
            ];
          });
        });
    } else {
      yield fireStore
        .collection(DB_LESSONS)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            lessons = [
              ...lessons,
              { [PROP_ID]: doc.id, ...doc.data() } as LessonData,
            ];
          });
        });
    }

    const sortedLessonsData = lessons
      .slice()
      .sort(
        (a, b) =>
          new Date(b[PROP_MODIFIED_AT] as string).getTime() -
          new Date(a[PROP_MODIFIED_AT] as string).getTime()
      );

    const [selectedLesson = {} as LessonData] = sortedLessonsData;

    yield put(onPutLessonsData(sortedLessonsData));
    yield put(onSelectLesson(selectedLesson[PROP_ID] as string));
  } catch (error) {
    yield put(
      onPutNotification({
        [PROP_NOTIFICATION_HEADER]: `Fetch Lessons Data Error: ${error[PROP_ERROR_CODE]}!`,
        [PROP_NOTIFICATION_BODY]: error[PROP_ERROR_MESSAGE],
        [PROP_FORMATTED_DATE_TIME]: moment().format('DD/MM/YYYY HH:mm'),
        [PROP_DELAY_TIME]: 4000,
      })
    );
  } finally {
    yield put(onToggleLessonDataLoading());
  }
}
