// Libs
import React from 'react';

// Components
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Nav from 'react-bootstrap/Nav';

// Constants
import {
  PROP_FIRST_NAME,
  PROP_LAST_NAME,
  PROP_EMAIL,
  PROP_PASSWORD,
  PROP_USER_TYPE,
  TYPE_STUDENT,
  TYPE_TEACHER,
} from '../constants';

// Styles
import '../styles/auth-form.scss';

// Imported types
import { PureComponent, FormEvent } from 'react';
import { SignUpAction, SignUpActionPayload as State } from '../types';

// Local types
interface Props {
  onSwitchForm(): void;
  onSignUp(signUpData: State): SignUpAction;
}

export default class SignUpForm extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = this.getInitialState();
  }

  private getInitialState = (): State => ({
    [PROP_FIRST_NAME]: '',
    [PROP_LAST_NAME]: '',
    [PROP_PASSWORD]: '',
    [PROP_EMAIL]: '',
    [PROP_USER_TYPE]: TYPE_STUDENT,
  });

  private onHandleSignUp = (e: FormEvent) => {
    const { onSignUp } = this.props;

    e.preventDefault();

    onSignUp(this.state);
    this.setState(() => {
      return this.getInitialState();
    });
  };

  render() {
    const { onSwitchForm } = this.props;
    const { firstName, lastName, email, password, userType } = this.state;

    return (
      <Form
        className="auth-form sign-up-form shadow p-3 mb-5 bg-white rounded"
        onSubmit={this.onHandleSignUp}
      >
        <Form.Group controlId="userFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            value={firstName}
            type="text"
            placeholder="Your First Name"
            onChange={(event) =>
              this.setState({
                [PROP_FIRST_NAME]: event.target.value || '',
              })
            }
          />
        </Form.Group>

        <Form.Group controlId="userLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            value={lastName}
            type="text"
            placeholder="Your Last Name"
            onChange={(event) =>
              this.setState({
                [PROP_LAST_NAME]: event.target.value || '',
              })
            }
          />
        </Form.Group>

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
        <fieldset className="user-type-inputs">
          <Form.Group>
            <Form.Label as={Col}>User Type</Form.Label>
            <Form.Check
              checked={userType === TYPE_TEACHER}
              inline
              type="radio"
              label="Teacher"
              name="userType"
              id="teacher"
              onChange={() =>
                this.setState({
                  [PROP_USER_TYPE]: TYPE_TEACHER,
                })
              }
            />
            <Form.Check
              checked={userType === TYPE_STUDENT}
              inline
              type="radio"
              label="Student"
              name="userType"
              id="student"
              onChange={() =>
                this.setState({
                  [PROP_USER_TYPE]: TYPE_STUDENT,
                })
              }
            />
          </Form.Group>
        </fieldset>
        <Row className={'submit-section justify-content-around'}>
          <Button variant="primary" type="submit">
            Sign Up
          </Button>
          <Nav onSelect={() => onSwitchForm()}>
            <Nav.Item>
              <Nav.Link eventKey="sign-in">Sign In</Nav.Link>
            </Nav.Item>
          </Nav>
        </Row>
      </Form>
    );
  }
}
