// Libs
import React from 'react';

// Utils
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { NavHeader, NavFooter, LessonsView } from '../components';

// Constants
import {
  STATE_LESSONS,
  PROP_OPERATION_DATA,
  PROP_OPERATION_TYPE,
  PROP_SELECTED_LESSON,
  PROP_SELECTED_LESSON_ID,
  PROP_IS_LOADING,
  STATE_USER,
} from '../constants';

// Styles
import '../styles/layout.scss';

// Actions
import {
  onSignOut,
  onPutNotification,
  onCreateLesson,
  onDiscardOperation,
  onUpdateOperationData,
  onSubmitLessonData,
  onSelectLesson,
  onDeleteLesson,
  onEditLesson,
} from '../actions';

// Selectors
import {
  isLoading$,
  selectUserData$,
  selectLessons$,
  selectOperationData$,
  selectOperationType$,
  getSelectedLessonItem$,
  getSelectedLessonItemId$,
} from '../selectors';

// Imported types
import { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import {
  SignOutAction,
  PutNotificationAction,
  PutNotificationActionPayload as NotificationData,
  CreateLessonAction,
  SubmitLessonDataAction,
  SelectLessonAction,
  LessonData,
  GlobalState,
  OperationType,
  UserData,
  DiscardOperationAction,
  UpdateOperationDataAction,
  UpdateOperationDataActionPayload as OperationData,
  DeleteLessonAction,
  EditLessonAction,
} from '../types';
import { Dispatch, AnyAction } from 'redux';

// Local types
export interface Props extends RouteComponentProps {
  [PROP_IS_LOADING]: boolean;
  [STATE_USER]: UserData;
  [STATE_LESSONS]: Array<LessonData>;
  [PROP_SELECTED_LESSON_ID]: string | null;
  [PROP_SELECTED_LESSON]: LessonData | null;
  [PROP_OPERATION_DATA]: LessonData | null;
  [PROP_OPERATION_TYPE]: OperationType | null;
  onSignOut(): SignOutAction;
  onPutNotification(notificationData: NotificationData): PutNotificationAction;
  onCreateLesson(currentUserId: string): CreateLessonAction;
  onDiscardOperation(): DiscardOperationAction;
  onUpdateOperationData(updates: OperationData): UpdateOperationDataAction;
  onSubmitLessonData(): SubmitLessonDataAction;
  onSelectLesson(lessonId: string): SelectLessonAction;
  onDeleteLesson(): DeleteLessonAction;
  onEditLesson(selectedLesson: LessonData): EditLessonAction;
}

export class MainLayout extends Component<Props> {
  render() {
    const {
      onSignOut,
      location: { pathname },
      onPutNotification,
      onCreateLesson,
      onDiscardOperation,
      onUpdateOperationData,
      onSubmitLessonData,
      onSelectLesson,
      onDeleteLesson,
      onEditLesson,
      user: { userId, userType },
      operationType,
      operationData,
      selectedLessonId,
      selectedLesson,
      lessons,
      isLoading,
    } = this.props;

    return (
      <Container className={'d-flex flex-column layout main-layout'} fluid>
        <Row className={'nav-header bg-light'}>
          <Col>
            <NavHeader
              onSignOut={() => {
                onSignOut();
                onDiscardOperation();
              }}
              currentLocationPath={pathname}
            />
          </Col>
        </Row>
        <LessonsView
          isLoading={isLoading}
          userType={userType}
          userId={userId}
          lessons={lessons}
          selectedLesson={selectedLesson}
          selectedLessonId={selectedLessonId}
          operationData={operationData}
          operationType={operationType}
          onCreateLesson={onCreateLesson}
          onDiscardOperation={onDiscardOperation}
          onPutNotification={onPutNotification}
          onSubmitLessonData={onSubmitLessonData}
          onUpdateOperationData={onUpdateOperationData}
          onSelectLesson={onSelectLesson}
          onDeleteLesson={onDeleteLesson}
          onEditLesson={onEditLesson}
        />
        <Row className={'nav-footer bg-light'}>
          <Col>
            <NavFooter />
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state: GlobalState) => ({
  [PROP_IS_LOADING]: isLoading$(state),
  [STATE_USER]: selectUserData$(state) as UserData,
  [STATE_LESSONS]: selectLessons$(state),
  [PROP_OPERATION_DATA]: selectOperationData$(state),
  [PROP_OPERATION_TYPE]: selectOperationType$(state),
  [PROP_SELECTED_LESSON]: getSelectedLessonItem$(state),
  [PROP_SELECTED_LESSON_ID]: getSelectedLessonItemId$(state),
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators(
    {
      onSignOut,
      onPutNotification,
      onCreateLesson,
      onDiscardOperation,
      onUpdateOperationData,
      onSubmitLessonData,
      onSelectLesson,
      onDeleteLesson,
      onEditLesson,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);
