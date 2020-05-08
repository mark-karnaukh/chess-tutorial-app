// Libs
import React from 'react';

// Utils
import { connect } from 'react-redux';

// Components
import Container from 'react-bootstrap/Container';

// Styles
import '../styles/layout.scss';

// Types
import { Component } from 'react';
import { RouteComponentProps } from 'react-router';

export class MainLayout extends Component<RouteComponentProps> {
  render() {
    return (
      <Container className={'layout main-layout'} fluid>
        Main Layout
      </Container>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);
