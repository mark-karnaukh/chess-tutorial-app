// Libs
import React from 'react';

// Utils
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Constants
import { ROUTE_PATH_DEFAULT } from '../constants';

// Components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import { NavHeader, NavFooter } from '../components';

// Styles
import '../styles/layout.scss';

// Actions
import { onSignOut, onDiscardOperation } from '../actions';

// Imported types
import { PureComponent } from 'react';
import { RouteComponentProps } from 'react-router';
import { SignOutAction, DiscardOperationAction } from '../types';
import { Dispatch, AnyAction } from 'redux';

// Local types
export interface Props extends RouteComponentProps {
  onSignOut(): SignOutAction;
  onDiscardOperation(): DiscardOperationAction;
}

export class NotFoundLayout extends PureComponent<Props> {
  private onGoBack = (): void => {
    const {
      location: { state },
      history: { goBack, push },
    } = this.props;

    return !!state ? goBack() : push(ROUTE_PATH_DEFAULT);
  };

  render() {
    const {
      onSignOut,
      onDiscardOperation,
      location: { pathname },
    } = this.props;

    return (
      <Container className={'d-flex flex-column layout profile-layout'} fluid>
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
        <Row className={'profile-view'}>
          <Jumbotron
            className={
              'w-100 mb-0 d-flex flex-column align-items-center justify-content-center'
            }
          >
            <div className={'message w-50'}>
              <h1>Page Not Found</h1>
              <p className={'mt-3'}>
                Unfortunately the page you're looking for doesn't exist
                (anymore) or there was an error in the link you followed or
                typed.
              </p>
              <p className={'mt-3'}>
                <Button variant="primary" onClick={this.onGoBack}>
                  Go Back
                </Button>
              </p>
            </div>
          </Jumbotron>
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

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators({ onSignOut, onDiscardOperation }, dispatch);

export default connect(null, mapDispatchToProps)(NotFoundLayout);
