// Libs
import React from 'react';

// Components
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Jumbotron from 'react-bootstrap/Jumbotron';
import LessonList from './LessonsList';
import LessonInfo from './LessonInfo';
import WithLoading from './WithLoading';

// Constants
import {
  PROP_USER_ID,
  PROP_USER_TYPE,
  PROP_IS_LOADING,
  STATE_LESSONS,
  PROP_SELECTED_LESSON,
  PROP_SELECTED_LESSON_ID,
  PROP_OPERATION_DATA,
  PROP_OPERATION_TYPE,
} from '../constants';

// Imported types
import { PureComponent } from 'react';
import {
  LessonData,
  OperationType,
  PutNotificationActionPayload as NotificationData,
  PutNotificationAction,
  CreateLessonAction,
  DiscardOperationAction,
  UpdateOperationDataActionPayload as OperationData,
  UpdateOperationDataAction,
  SubmitLessonDataAction,
  SelectLessonAction,
} from '../types';

export interface Props {
  [PROP_USER_ID]: string;
  [PROP_USER_TYPE]: string;
  [PROP_IS_LOADING]: boolean;
  [STATE_LESSONS]: Array<LessonData>;
  [PROP_SELECTED_LESSON]: LessonData | null;
  [PROP_SELECTED_LESSON_ID]: string | null;
  [PROP_OPERATION_DATA]: LessonData | null;
  [PROP_OPERATION_TYPE]: OperationType | null;
  onPutNotification(notificationData: NotificationData): PutNotificationAction;
  onCreateLesson(currentUserId: string): CreateLessonAction;
  onDiscardOperation(): DiscardOperationAction;
  onUpdateOperationData(updates: OperationData): UpdateOperationDataAction;
  onSubmitLessonData(): SubmitLessonDataAction;
  onSelectLesson(lessonId: string): SelectLessonAction;
}

export class LessonsView extends PureComponent<Props> {
  render() {
    const {
      userId,
      userType,
      lessons,
      selectedLessonId,
      selectedLesson,
      operationData,
      operationType,
      onCreateLesson,
      onDiscardOperation,
      onPutNotification,
      onSubmitLessonData,
      onUpdateOperationData,
      onSelectLesson,
    } = this.props;

    return (
      <Row className={'lessons-view'}>
        <Col lg={4} md={4} sm={4} className={'h-100 min-vw-25'}>
          <LessonList
            userType={userType}
            lessons={lessons}
            selectedLessonId={selectedLessonId}
            onCreateLesson={() => onCreateLesson(userId)}
            onSelectLesson={onSelectLesson}
            operationType={operationType}
          />
        </Col>
        <Col className={'shadow h-100 overflow-auto'} lg={8} md={8} sm={8}>
          {operationData || selectedLesson ? (
            <LessonInfo
              onSubmitLessonData={onSubmitLessonData}
              onDiscardOperation={onDiscardOperation}
              onPutNotification={onPutNotification}
              onUpdateOperationData={onUpdateOperationData}
              lessonData={(operationData || selectedLesson) as LessonData}
              operationType={operationType}
            />
          ) : (
            <Jumbotron
              className={
                'h-100 d-flex flex-column align-items-center justify-content-center no-lessons'
              }
            >
              <h1>No Lessons Available!</h1>
              <p>
                Currently there is no lessons available. Please create a new
                one.
              </p>
            </Jumbotron>
          )}
        </Col>
      </Row>
    );
  }
}

export default WithLoading(LessonsView);
