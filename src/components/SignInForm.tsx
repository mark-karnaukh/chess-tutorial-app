// Libs
import React from 'react';

// Components
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';

// Constants
import {
  PROP_EMAIL,
  PROP_PASSWORD,
  PROP_IS_VALIDATED,
  PROP_ERRORS,
  PROP_ERROR_MESSAGE,
} from '../constants';

// Styles
import '../styles/auth-form.scss';

// Imported types
import { PureComponent, FormEvent } from 'react';
import { SignInAction, SignInActionPayload, FirebaseError } from '../types';

// Local types
interface Props {
  onSwitchForm(): void;
  onSignIn(signInData: SignInActionPayload): SignInAction;
  [PROP_ERRORS]: FirebaseError[];
}

interface State extends SignInActionPayload {
  [PROP_IS_VALIDATED]: boolean;
}

export default class SignInForm extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = this.getInitialState();
  }

  private getInitialState = (): State => ({
    [PROP_EMAIL]: '',
    [PROP_PASSWORD]: '',
    [PROP_IS_VALIDATED]: false,
  });

  private onHandleSignIn = (e: FormEvent<HTMLFormElement>): void => {
    const { onSignIn } = this.props;
    const { email, password } = this.state;
    const form = e.currentTarget;

    e.preventDefault();

    if (form.checkValidity() === false) {
      return this.setState({ [PROP_IS_VALIDATED]: true });
    }

    onSignIn({ email, password });
    this.setState(this.getInitialState());
  };

  private renderLatestSignInRequestError = (): JSX.Element => {
    const { errors } = this.props;

    return (
      <Alert variant="danger" className={'sign-in-auth-req-error'}>
        <Alert.Heading>Sign In Request Error:</Alert.Heading>
        <p>{errors[errors.length - 1][PROP_ERROR_MESSAGE]}</p>
      </Alert>
    );
  };

  private renderSignInFormValidationErrorMessage = (field: string): string => {
    switch (field) {
      case PROP_EMAIL:
        return 'Please provide a valid email address.';
      case PROP_PASSWORD:
        return 'Please provide a valid password.';
      default:
        return '';
    }
  };

  render() {
    const { onSwitchForm, errors } = this.props;
    const { email, password, isValidated } = this.state;

    return (
      <Form
        noValidate
        validated={isValidated}
        className="auth-form sign-in-form shadow p-3 mb-5 bg-white rounded"
        onSubmit={this.onHandleSignIn}
      >
        <Form.Group controlId="signIn.userEmail">
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
            {this.renderSignInFormValidationErrorMessage(PROP_EMAIL)}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="signIn.userPassword">
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
            {this.renderSignInFormValidationErrorMessage(PROP_PASSWORD)}
          </Form.Control.Feedback>
        </Form.Group>
        {!!errors.length && this.renderLatestSignInRequestError()}
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
