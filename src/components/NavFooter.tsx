// Libs
import React from 'react';

// Components
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

// Imported type
import { PureComponent } from 'react';

export default class NavFooter extends PureComponent {
  render() {
    return (
      <Navbar bg="light" variant="light">
        <Nav className="m-auto">
          <Nav.Item>
            <Nav.Link disabled href="#privacy-policy">
              Privacy Policy
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link disabled href="#cookie-policy">
              Cookie Policy
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link disabled href="#cookie-settings">
              Cookie Settings
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Navbar>
    );
  }
}
