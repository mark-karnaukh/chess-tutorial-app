// Types
import { LessonsState, LessonsStateActions, LessonData } from '../types';

// Constants
import {
  ACTION_TOGGLE_LESSON_DATA_LOADING,
  ACTION_PUT_LESSONS_DATA,
  ACTION_SELECT_LESSON,
  PROP_SELECTED_LESSON_ID,
  PROP_IS_LOADING,
  PROP_DATA,
  defaultLessonsState,
} from '../constants';

export function lessonsReducer(
  state: LessonsState = defaultLessonsState,
  action: LessonsStateActions
): LessonsState {
  const { type, payload } = action;

  switch (type) {
    case ACTION_TOGGLE_LESSON_DATA_LOADING:
      const { isLoading } = state;

      return { ...state, [PROP_IS_LOADING]: !isLoading };
    case ACTION_PUT_LESSONS_DATA:
      return { ...state, [PROP_DATA]: payload as LessonData[] };
    case ACTION_SELECT_LESSON:
      return {
        ...state,
        [PROP_SELECTED_LESSON_ID]: (payload as string) || null,
      };
    default:
      return state;
  }
}
