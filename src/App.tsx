// Libs
import React from 'react';

// Utils
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Firebase
import { auth as firebaseAuth } from './firebase';

// Components
import { AuthLayout, MainLayout } from './layouts';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Actions
import { onFetchUserData } from './actions';

// Imported Types
import { Component } from 'react';
import { Dispatch, AnyAction } from 'redux';
import { FetchUserDataAction, FetchUserDataActionPayload } from './types';

// Local Types
export interface Props {
  onFetchUserData(userData: FetchUserDataActionPayload): FetchUserDataAction;
}

class App extends Component<Props> {
  private unsubscribeFromFirebaseServices: any[];

  constructor(props: Props) {
    super(props);
    this.unsubscribeFromFirebaseServices = [];
  }

  public componentDidMount() {
    this.subscribeToFirebaseServices();
  }

  public componentWillUnmount() {
    this.unsubscribeFromFirebaseServices.forEach((unsubscribeListener) =>
      unsubscribeListener()
    );
  }

  private subscribeToFirebaseServices = () => {
    this.unsubscribeFromFirebaseServices = [
      firebaseAuth.onAuthStateChanged((user) => {
        console.log('Authenticated user', user);
      }),
    ];
  };

  render() {
    return (
      <Router>
        <div className="app-view">
          <Switch>
            <Route path="/" exact component={MainLayout}></Route>
            <Route path="/auth" component={AuthLayout}></Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators({ onFetchUserData }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
