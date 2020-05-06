// Libs
import React, { PureComponent } from 'react';

// Components
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Nav from 'react-bootstrap/Nav';

// Styles
import '../styles/auth-form.scss';

// Types
interface Props {
  onSwitchForm(): void;
}

export default class SignUpForm extends PureComponent<Props> {
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
