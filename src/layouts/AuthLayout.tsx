import React, { Component } from 'react';
import { connect } from 'react-redux';

export class AuthLayout extends Component {
  render() {
    return <div></div>;
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AuthLayout);
