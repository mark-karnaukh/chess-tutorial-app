// Libs
import React from 'react';

// Components
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';

// Constants
import { PROP_EMAIL, PROP_PASSWORD } from '../constants';

// Styles
import '../styles/auth-form.scss';

// Imported types
import { PureComponent, FormEvent } from 'react';
import { SignInAction, SignInActionPayload as State } from '../types';

// Local types
interface Props {
  onSwitchForm(): void;
  onSignIn(signInData: State): SignInAction;
}

export default class SignInForm extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = this.getInitialState();
  }

  private getInitialState = (): State => ({
    [PROP_EMAIL]: '',
    [PROP_PASSWORD]: '',
  });

  private onHandleSignIn = (e: FormEvent) => {
    const { onSignIn } = this.props;

    e.preventDefault();

    onSignIn(this.state);
    this.setState(this.getInitialState());
  };

  render() {
    const { onSwitchForm } = this.props;
    const { email, password } = this.state;

    return (
      <Form
        className="auth-form sign-in-form shadow p-3 mb-5 bg-white rounded"
        onSubmit={this.onHandleSignIn}
      >
        <Form.Group controlId="userEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            value={email}
            type="email"
            placeholder="Enter email"
            onChange={(event) =>
              this.setState({
                [PROP_EMAIL]: event.target.value || '',
              })
            }
          />
        </Form.Group>

        <Form.Group controlId="userPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={password}
            type="password"
            placeholder="Password"
            onChange={(event) =>
              this.setState({
                [PROP_PASSWORD]: event.target.value || '',
              })
            }
          />
        </Form.Group>
        <Row className={'submit-section justify-content-around'}>
          <Button variant="primary" type="submit">
            Sign In
          </Button>
          <Nav onSelect={() => onSwitchForm()}>
            <Nav.Item>
              <Nav.Link eventKey="sign-up">Sign Up</Nav.Link>
            </Nav.Item>
          </Nav>
        </Row>
      </Form>
    );
  }
}
