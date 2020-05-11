// Libs
import React from 'react';

// Utils
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Components
import Container from 'react-bootstrap/Container';
import { NavBar } from '../components';

// Styles
import '../styles/layout.scss';

// Actions
import { onSignOut } from '../actions';

// Imported types
import { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import { SignOutAction } from '../types';
import { Dispatch, AnyAction } from 'redux';

// Local types
export interface Props extends RouteComponentProps {
  onSignOut(): SignOutAction;
}

export class MainLayout extends Component<Props> {
  render() {
    const { onSignOut } = this.props;

    return (
      <Container className={'layout main-layout'} fluid>
        <NavBar onSignOut={onSignOut} />
        Main Layout
      </Container>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators({ onSignOut }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);
