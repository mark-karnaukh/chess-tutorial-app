// Libs
import React from 'react';

// Utils
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Components
import Container from 'react-bootstrap/Container';
import { LogInForm, SignUpForm } from '../components';

// Styles
import '../styles/auth-layout.scss';
import '../styles/layout.scss';

// Actions
import { onLogIn, onSignUp } from '../actions';

// Imported types
import { Component } from 'react';
import {
  LogInAction,
  LogInActionPayload,
  SignUpAction,
  SignUpActionPayload,
} from '../types';
import { RouteComponentProps } from 'react-router';
import { Dispatch, AnyAction } from 'redux';

// Local types
export interface Props extends RouteComponentProps {
  onLogIn(logInData: LogInActionPayload): LogInAction;
  onSignUp(signUpData: SignUpActionPayload): SignUpAction;
}

export interface State {
  isRegistered: boolean;
}

export class AuthLayout extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { isRegistered: true };
  }

  render() {
    return (
      <Container className={'layout auth-layout'} fluid>
        {this.renderForm()}
      </Container>
    );
  }

  private onSwitchForm = (): void => {
    const { isRegistered } = this.state;

    this.setState(() => {
      return { isRegistered: !isRegistered };
    });
  };

  private renderForm = (): JSX.Element => {
    const { isRegistered } = this.state;
    const { onLogIn, onSignUp } = this.props;

    return isRegistered ? (
      <LogInForm onSwitchForm={this.onSwitchForm} onLogIn={onLogIn} />
    ) : (
      <SignUpForm onSwitchForm={this.onSwitchForm} onSignUp={onSignUp} />
    );
  };
}

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators({ onLogIn, onSignUp }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AuthLayout);
