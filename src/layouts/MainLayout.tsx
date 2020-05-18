// Libs
import React from 'react';

// Utils
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Jumbotron from 'react-bootstrap/Jumbotron';
import { NavHeader, NavFooter, LessonInfo, LessonList } from '../components';

// Constants
import {
  STATE_LESSONS,
  PROP_OPERATION_DATA,
  PROP_OPERATION_TYPE,
  PROP_SELECTED_LESSON,
  PROP_SELECTED_LESSON_ID,
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
} from '../actions';

// Selectors
import {
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
  LessonData,
  GlobalState,
  OperationType,
  UserData,
  DiscardOperationAction,
} from '../types';
import { Dispatch, AnyAction } from 'redux';

// Local types
export interface Props extends RouteComponentProps {
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
}

export class MainLayout extends Component<Props> {
  render() {
    const {
      onSignOut,
      location: { pathname },
      onPutNotification,
      onCreateLesson,
      onDiscardOperation,
      user: { userId },
      operationType,
      operationData,
      selectedLessonId,
      selectedLesson,
      lessons,
    } = this.props;

    return (
      <Container className={'d-flex flex-column layout main-layout'} fluid>
        <Row className={'nav-header bg-light'}>
          <Col>
            <NavHeader onSignOut={onSignOut} currentLocationPath={pathname} />
          </Col>
        </Row>
        <Row className={'lessons-view'}>
          <Col lg={4} md={4} sm={4} className={'h-100 min-vw-25'}>
            <LessonList
              lessons={lessons}
              selectedLessonId={selectedLessonId}
              onCreateLesson={() => onCreateLesson(userId)}
              operationType={operationType}
            />
          </Col>
          <Col className={'shadow h-100 overflow-auto'} lg={8} md={8} sm={8}>
            {operationData || selectedLesson ? (
              <LessonInfo
                onDiscardOperation={onDiscardOperation}
                onPutNotification={onPutNotification}
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
  [STATE_USER]: selectUserData$(state) as UserData,
  [STATE_LESSONS]: selectLessons$(state),
  [PROP_OPERATION_DATA]: selectOperationData$(state),
  [PROP_OPERATION_TYPE]: selectOperationType$(state),
  [PROP_SELECTED_LESSON]: getSelectedLessonItem$(state),
  [PROP_SELECTED_LESSON_ID]: getSelectedLessonItemId$(state),
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators(
    { onSignOut, onPutNotification, onCreateLesson, onDiscardOperation },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);
