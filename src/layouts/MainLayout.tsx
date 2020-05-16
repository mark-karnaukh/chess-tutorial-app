// Libs
import React from 'react';

// Utils
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { NavHeader, NavFooter, LessonInfo } from '../components';

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
  onSignOut(): SignOutAction;
  onPutNotification(notificationData: NotificationData): PutNotificationAction;
}

export class MainLayout extends Component<Props> {
  render() {
    const {
      onSignOut,
      location: { pathname },
      onPutNotification,
    } = this.props;

    return (
      <Container className={'d-flex flex-column layout main-layout'} fluid>
        <Row className={'nav-header'}>
          <Col>
            <NavHeader onSignOut={onSignOut} currentLocationPath={pathname} />
          </Col>
        </Row>
        <Row className={'lessons-view'}>
          <Col lg={4} md={2} className={'h-100'}>
            Main Layout
          </Col>
          <Col className={'shadow h-100 overflow-auto'} lg={8} md={10}>
            <LessonInfo onPutNotification={onPutNotification} />
          </Col>
        </Row>
        <Row className={'nav-footer'}>
          <Col>
            <NavFooter />
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators({ onSignOut, onPutNotification }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);
