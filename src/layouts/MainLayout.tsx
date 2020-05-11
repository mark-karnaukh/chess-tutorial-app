// Libs
import React from 'react';

// Utils
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { NavBar } from '../components';

// Styles
import '../styles/layout.scss';

// Actions
import { onSignOut } from '../actions';

// Imported types
import { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import { SignOutAction } from '../types';
import { Dispatch, AnyAction } from 'redux';

// Local types
export interface Props extends RouteComponentProps {
  onSignOut(): SignOutAction;
}

export class MainLayout extends Component<Props> {
  render() {
    const {
      onSignOut,
      location: { pathname },
    } = this.props;

    return (
      <Container className={'d-flex flex-column layout main-layout'} fluid>
        <Row>
          <Col>
            <NavBar onSignOut={onSignOut} currentLocationPath={pathname} />
          </Col>
        </Row>
        <Row className={'flex-grow-1'}>
          <Col lg={2} md={3}>
            Main Layout
          </Col>
          <Col className={'shadow-sm'} lg={7} md={5}></Col>
          <Col lg={3} md={4}></Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators({ onSignOut }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);
