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
import { STATE_LESSONS } from '../constants';

// Mock data
import { lessons } from '../components/mockLessonsList';

// Styles
import '../styles/layout.scss';

// Actions
import { onSignOut, onPutNotification } from '../actions';

// Imported types
import { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import {
  SignOutAction,
  PutNotificationAction,
  PutNotificationActionPayload as NotificationData,
} from '../types';
import { Dispatch, AnyAction } from 'redux';

// Local types
export interface Props extends RouteComponentProps {
  [STATE_LESSONS]: Array<any>;
  onSignOut(): SignOutAction;
  onPutNotification(notificationData: NotificationData): PutNotificationAction;
}

export class MainLayout extends Component<Props> {
  render() {
    const {
      onSignOut,
      location: { pathname },
      onPutNotification,
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
            <LessonList lessons={lessons} selectedLessonId={'3'} />
          </Col>
          <Col className={'shadow h-100 overflow-auto'} lg={8} md={8} sm={8}>
            {lessons.length ? (
              <LessonInfo onPutNotification={onPutNotification} />
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

const mapStateToProps = () => ({
  [STATE_LESSONS]: [...lessons],
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators({ onSignOut, onPutNotification }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);
