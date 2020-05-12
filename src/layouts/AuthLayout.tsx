// Libs
import React from 'react';

// Utils
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Components
import Container from 'react-bootstrap/Container';
import { SignInForm, SignUpForm, WithLoading } from '../components';
import { Redirect } from 'react-router-dom';

// Constants
import {
  PROP_IS_AUTHENTICATED,
  PROP_IS_REGISTERED,
  PROP_IS_LOADING,
  ROUTE_PATH_DEFAULT,
  ERRORS_SIGN_IN,
  ERRORS_SIGN_UP,
} from '../constants';

// Styles
import '../styles/auth-layout.scss';
import '../styles/layout.scss';

// Actions
import { onSignIn, onSignUp, onClearAuthRequestErrors } from '../actions';

// Selectors
import {
  isAuthenticated$,
  isLoading$,
  selectSignInAuthErrors$,
  selectSignUpAuthErrors$,
} from '../selectors';

// Imported types
import { Component } from 'react';
import {
  AuthError,
  SignInAction,
  SignInActionPayload,
  SignUpAction,
  SignUpActionPayload,
  ClearAuthRequestErrorsAction,
  GlobalState,
} from '../types';
import { RouteComponentProps } from 'react-router';
import { Dispatch, AnyAction } from 'redux';

// Local types
export interface Props extends RouteComponentProps {
  onSignIn(signInData: SignInActionPayload): SignInAction;
  onSignUp(signUpData: SignUpActionPayload): SignUpAction;
  onClearAuthRequestErrors(): ClearAuthRequestErrorsAction;
  [PROP_IS_AUTHENTICATED]: boolean;
  [PROP_IS_LOADING]: boolean;
  [ERRORS_SIGN_IN]: AuthError[];
  [ERRORS_SIGN_UP]: AuthError[];
}

export interface State {
  [PROP_IS_REGISTERED]: boolean;
}

export class AuthLayout extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { [PROP_IS_REGISTERED]: this.setInitialState() };
  }

  render() {
    return (
      <Container className={'layout auth-layout'} fluid>
        {this.renderForm()}
      </Container>
    );
  }

  private setInitialState = (): boolean => {
    const { errorsSignIn, errorsSignUp } = this.props;

    if (!!errorsSignUp.length) {
      return false;
    }

    if (!!errorsSignIn.length) {
      return true;
    }

    return true;
  };

  private onSwitchForm = (): void => {
    const { [PROP_IS_REGISTERED]: isRegistered } = this.state;
    const { onClearAuthRequestErrors } = this.props;

    this.setState(() => {
      onClearAuthRequestErrors();

      return { isRegistered: !isRegistered };
    });
  };

  private renderForm = (): JSX.Element => {
    const { isRegistered } = this.state;
    const {
      onSignIn,
      onSignUp,
      location: { state },
      [ERRORS_SIGN_IN]: signInAuthErrors,
      [ERRORS_SIGN_UP]: signUpAuthErrors,
      [PROP_IS_AUTHENTICATED]: isAuthenticated,
    } = this.props;
    const { from: pathToRedirect } = (state as { [key: string]: string }) || {
      from: { pathname: ROUTE_PATH_DEFAULT },
    };

    if (isAuthenticated) {
      return <Redirect to={pathToRedirect} push={true} />;
    }

    return isRegistered ? (
      <SignInForm
        onSwitchForm={this.onSwitchForm}
        onSignIn={onSignIn}
        errors={signInAuthErrors}
      />
    ) : (
      <SignUpForm
        onSwitchForm={this.onSwitchForm}
        onSignUp={onSignUp}
        errors={signUpAuthErrors}
      />
    );
  };
}

const mapStateToProps = (state: GlobalState) => ({
  [PROP_IS_AUTHENTICATED]: isAuthenticated$(state),
  [PROP_IS_LOADING]: isLoading$(state),
  [ERRORS_SIGN_IN]: selectSignInAuthErrors$(state),
  [ERRORS_SIGN_UP]: selectSignUpAuthErrors$(state),
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators(
    { onSignIn, onSignUp, onClearAuthRequestErrors },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithLoading(AuthLayout));
