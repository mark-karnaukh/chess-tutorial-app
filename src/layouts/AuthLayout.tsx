// Libs
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Components
import Container from 'react-bootstrap/Container';
import { LoginForm, SignUpForm } from '../components';

// Styles
import '../styles/auth-layout.scss';
import '../styles/layout.scss';

// Types
import { RouteComponentProps } from 'react-router';

export interface State {
  isRegistered: boolean;
}

export class AuthLayout extends Component<RouteComponentProps, State> {
  constructor(props: RouteComponentProps) {
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

    return isRegistered ? (
      <LoginForm onSwitchForm={this.onSwitchForm} />
    ) : (
      <SignUpForm onSwitchForm={this.onSwitchForm} />
    );
  };
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AuthLayout);
