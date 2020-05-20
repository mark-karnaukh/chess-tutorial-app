// Redux saga effects
import { all, fork } from 'redux-saga/effects';

// Sagas
import { onWatchSignIn } from './handleSignIn';
import { onWatchSignUp } from './handleSignUp';
import { onWatchSignOut } from './handleSignOut';
import { onWatchSubmitUserData } from './submitUserData';
import { onWatchFetchUserData } from './fetchUserData';
import { onWatchPutNotification } from './showNotification';
import { onWatchSubmitLessonData } from './submitLessonData';
import { onWatchFetchLessonsData } from './fetchLessonsData';
import { onWatchDeleteLesson } from './deleteLesson';

export const rootSaga = function* rootSaga() {
  yield all([
    fork(onWatchSignIn),
    fork(onWatchSignUp),
    fork(onWatchSignOut),
    fork(onWatchSubmitUserData),
    fork(onWatchFetchUserData),
    fork(onWatchPutNotification),
    fork(onWatchSubmitLessonData),
    fork(onWatchFetchLessonsData),
    fork(onWatchDeleteLesson),
  ]);
};
