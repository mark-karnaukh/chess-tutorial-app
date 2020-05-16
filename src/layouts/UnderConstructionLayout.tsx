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
import { onSignOut } from '../actions';

// Imported types
import { PureComponent } from 'react';
import { RouteComponentProps } from 'react-router';
import { SignOutAction } from '../types';
import { Dispatch, AnyAction } from 'redux';

// Local types
export interface Props extends RouteComponentProps {
  onSignOut(): SignOutAction;
}

export class UnderConstructionLayout extends PureComponent<Props> {
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
      location: { pathname },
    } = this.props;

    return (
      <Container className={'d-flex flex-column layout profile-layout'} fluid>
        <Row className={'nav-header'}>
          <Col>
            <NavHeader onSignOut={onSignOut} currentLocationPath={pathname} />
          </Col>
        </Row>
        <Row className={'profile-view'}>
          <Jumbotron
            className={
              'w-100 mb-0 d-flex flex-column align-items-center justify-content-center'
            }
          >
            <div className={'message w-50'}>
              <h1>Page Under Construction</h1>
              <p className={'mt-3'}>
                Sorry for the dust! We’re working hard to make this web page
                available again for you. Until then, stay tuned, and keep the
                faith! ;)
              </p>
              <p className={'mt-3'}>
                <Button variant="primary" onClick={this.onGoBack}>
                  Go Back
                </Button>
              </p>
            </div>
          </Jumbotron>
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

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators({ onSignOut }, dispatch);

export default connect(null, mapDispatchToProps)(UnderConstructionLayout);
