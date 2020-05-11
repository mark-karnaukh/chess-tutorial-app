// Libs
import React from 'react';

// Utils
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Components
import Container from 'react-bootstrap/Container';
import { SignInForm, SignUpForm } from '../components';
import { Redirect } from 'react-router-dom';

// Constants
import {
  PROP_IS_AUTHENTICATED_USER,
  PROP_IS_REGISTERED_USER,
  ROUTE_PATH_DEFAULT,
} from '../constants';

// Styles
import '../styles/auth-layout.scss';
import '../styles/layout.scss';

// Actions
import { onSignIn, onSignUp } from '../actions';

// Selectors
import { isAuthenticatedUser$ } from '../selectors';

// Imported types
import { Component } from 'react';
import {
  SignInAction,
  SignInActionPayload,
  SignUpAction,
  SignUpActionPayload,
  GlobalState,
} from '../types';
import { RouteComponentProps } from 'react-router';
import { Dispatch, AnyAction } from 'redux';

// Local types
export interface Props extends RouteComponentProps {
  onSignIn(signInData: SignInActionPayload): SignInAction;
  onSignUp(signUpData: SignUpActionPayload): SignUpAction;
  [PROP_IS_AUTHENTICATED_USER]: boolean;
}

export interface State {
  [PROP_IS_REGISTERED_USER]: boolean;
}

export class AuthLayout extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { [PROP_IS_REGISTERED_USER]: true };
  }

  render() {
    return (
      <Container className={'layout auth-layout'} fluid>
        {this.renderForm()}
      </Container>
    );
  }

  private onSwitchForm = (): void => {
    const { [PROP_IS_REGISTERED_USER]: isRegisteredUser } = this.state;

    this.setState(() => {
      return { isRegisteredUser: !isRegisteredUser };
    });
  };

  private renderForm = (): JSX.Element => {
    const { isRegisteredUser } = this.state;
    const {
      onSignIn,
      onSignUp,
      location: { state },
      [PROP_IS_AUTHENTICATED_USER]: isAuthenticatedUser,
    } = this.props;
    const { from: pathToRedirect } = (state as { [key: string]: string }) || {
      from: { pathname: ROUTE_PATH_DEFAULT },
    };

    if (isAuthenticatedUser) {
      return <Redirect to={pathToRedirect} push={true} />;
    }

    return isRegisteredUser ? (
      <SignInForm onSwitchForm={this.onSwitchForm} onSignIn={onSignIn} />
    ) : (
      <SignUpForm onSwitchForm={this.onSwitchForm} onSignUp={onSignUp} />
    );
  };
}

const mapStateToProps = (state: GlobalState) => ({
  [PROP_IS_AUTHENTICATED_USER]: isAuthenticatedUser$(state),
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators({ onSignIn, onSignUp }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AuthLayout);
