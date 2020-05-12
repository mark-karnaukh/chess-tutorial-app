// Libs
import React from 'react';

// Components
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Nav from 'react-bootstrap/Nav';
import Alert from 'react-bootstrap/Alert';

// Constants
import {
  PROP_FIRST_NAME,
  PROP_LAST_NAME,
  PROP_EMAIL,
  PROP_PASSWORD,
  PROP_USER_TYPE,
  TYPE_STUDENT,
  TYPE_TEACHER,
  PROP_IS_VALIDATED,
  PROP_ERRORS,
  PROP_ERROR_MESSAGE,
} from '../constants';

// Styles
import '../styles/auth-form.scss';

// Imported types
import { PureComponent, FormEvent } from 'react';
import { SignUpAction, SignUpActionPayload, AuthError } from '../types';

// Local types
interface Props {
  onSwitchForm(): void;
  onSignUp(signUpData: SignUpActionPayload): SignUpAction;
  [PROP_ERRORS]: AuthError[];
}

interface State extends SignUpActionPayload {
  [PROP_IS_VALIDATED]: boolean;
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
    [PROP_IS_VALIDATED]: false,
  });

  private onHandleSignUp = (e: FormEvent<HTMLFormElement>) => {
    const { onSignUp } = this.props;
    const { firstName, lastName, email, password, userType } = this.state;
    const form = e.currentTarget;

    e.preventDefault();

    if (form.checkValidity() === false) {
      return this.setState({ [PROP_IS_VALIDATED]: true });
    }

    onSignUp({ firstName, lastName, email, password, userType });
    this.setState(() => {
      return this.getInitialState();
    });
  };

  private renderLatestSignUpRequestError = (): JSX.Element => {
    const { errors } = this.props;

    return (
      <Alert variant="danger" className={'sign-up-auth-req-error'}>
        <Alert.Heading>Sign Up Request Error:</Alert.Heading>
        <p>{errors[errors.length - 1][PROP_ERROR_MESSAGE]}</p>
      </Alert>
    );
  };

  private renderSignUpFormValidationErrorMessage = (field: string) => {
    switch (field) {
      case PROP_FIRST_NAME:
        return 'Please provide your first name.';
      case PROP_LAST_NAME:
        return 'Please provide your last name.';
      case PROP_EMAIL:
        return 'Please provide a valid email address.';
      case PROP_PASSWORD:
        return 'Please provide a secure password.';
      default:
        return '';
    }
  };

  render() {
    const { onSwitchForm, errors } = this.props;
    const {
      firstName,
      lastName,
      email,
      password,
      userType,
      isValidated,
    } = this.state;

    return (
      <Form
        noValidate
        validated={isValidated}
        className="auth-form sign-up-form shadow p-3 mb-5 bg-white rounded"
        onSubmit={this.onHandleSignUp}
      >
        <Form.Group controlId="userFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            required
            value={firstName}
            type="text"
            placeholder="Your First Name"
            onChange={(event) =>
              this.setState({
                [PROP_FIRST_NAME]: event.target.value || '',
              })
            }
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            {this.renderSignUpFormValidationErrorMessage(PROP_FIRST_NAME)}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="userLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            required
            value={lastName}
            type="text"
            placeholder="Your Last Name"
            onChange={(event) =>
              this.setState({
                [PROP_LAST_NAME]: event.target.value || '',
              })
            }
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            {this.renderSignUpFormValidationErrorMessage(PROP_LAST_NAME)}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="userEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            required
            value={email}
            type="email"
            placeholder="Enter email"
            onChange={(event) =>
              this.setState({
                [PROP_EMAIL]: event.target.value || '',
              })
            }
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            {this.renderSignUpFormValidationErrorMessage(PROP_EMAIL)}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="userPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            value={password}
            type="password"
            placeholder="Password"
            onChange={(event) =>
              this.setState({
                [PROP_PASSWORD]: event.target.value || '',
              })
            }
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            {this.renderSignUpFormValidationErrorMessage(PROP_PASSWORD)}
          </Form.Control.Feedback>
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
        {!!errors.length && this.renderLatestSignUpRequestError()}
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
