// Libs
import React, { PureComponent } from 'react';

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
} from '../constants';

// Styles
import '../styles/auth-form.scss';

// Types
interface Props {
  onSwitchForm(): void;
}

interface State {
  [PROP_FIRST_NAME]: string;
  [PROP_LAST_NAME]: string;
  [PROP_PASSWORD]: string;
  [PROP_EMAIL]: string;
  [PROP_USER_TYPE]: string;
}

export default class SignUpForm extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      [PROP_FIRST_NAME]: '',
      [PROP_LAST_NAME]: '',
      [PROP_PASSWORD]: '',
      [PROP_EMAIL]: '',
      [PROP_USER_TYPE]: '',
    };
  }

  render() {
    const { onSwitchForm } = this.props;

    return (
      <Form className="auth-form signup-form shadow p-3 mb-5 bg-white rounded">
        <Form.Group controlId="userFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" placeholder="Your First Name" />
        </Form.Group>

        <Form.Group controlId="userLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" placeholder="Your Last Name" />
        </Form.Group>

        <Form.Group controlId="userEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group controlId="userPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <fieldset className="user-type-inputs">
          <Form.Group>
            <Form.Label as={Col}>User Type</Form.Label>
            <Form.Check
              inline
              type="radio"
              label="Teacher"
              name="userType"
              id="teacher"
            />
            <Form.Check
              inline
              type="radio"
              label="Student"
              name="userType"
              id="student"
            />
          </Form.Group>
        </fieldset>
        <Row className={'submit-section justify-content-around'}>
          <Button variant="primary" type="submit">
            Sign Up
          </Button>
          <Nav onSelect={() => onSwitchForm()}>
            <Nav.Item>
              <Nav.Link eventKey="sign-ip">Sign In</Nav.Link>
            </Nav.Item>
          </Nav>
        </Row>
      </Form>
    );
  }
}
