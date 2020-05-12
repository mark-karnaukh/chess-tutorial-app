// Libs
import React from 'react';

// Utils
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Firebase
import { auth as firebaseAuth } from './firebase';

// Components
import { AuthLayout, MainLayout } from './layouts';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { WithPrivateRoute } from './components';

// Constants
import {
  ROUTE_PATH_AUTH,
  ROUTE_PATH_DEFAULT,
  ROUTE_PATH_LESSONS,
  PROP_IS_AUTHENTICATED,
  PROP_USER_ID,
} from './constants';

// Actions
import { onFetchUserData } from './actions';

// Selectors
import { isAuthenticated$ } from './selectors';

// Imported Types
import { Component } from 'react';
import { Dispatch, AnyAction } from 'redux';
import {
  FetchUserDataAction,
  FetchUserDataActionPayload,
  GlobalState,
} from './types';

// Local Types
export interface Props {
  onFetchUserData(userData: FetchUserDataActionPayload): FetchUserDataAction;
  [PROP_IS_AUTHENTICATED]: boolean;
}

class App extends Component<Props> {
  private unsubscribeFromFirebaseAuthService: firebase.Unsubscribe | null;

  constructor(props: Props) {
    super(props);
    this.unsubscribeFromFirebaseAuthService = null;
  }

  public componentDidMount() {
    this.subscribeToFirebaseAuthService();
  }

  public componentWillUnmount() {
    !!this.unsubscribeFromFirebaseAuthService &&
      this.unsubscribeFromFirebaseAuthService();
  }

  private subscribeToFirebaseAuthService = () => {
    const { onFetchUserData } = this.props;

    this.unsubscribeFromFirebaseAuthService = firebaseAuth.onAuthStateChanged(
      (user) => {
        if (!!user) {
          console.log('Authenticated user: ', user);
          const { uid } = user;

          onFetchUserData({ [PROP_USER_ID]: uid });
        }
      }
    );
  };

  render() {
    const { [PROP_IS_AUTHENTICATED]: isAuthenticated } = this.props;

    return (
      <Router>
        <div className="app-view">
          <Switch>
            <Route path={ROUTE_PATH_DEFAULT} exact>
              <Redirect to={ROUTE_PATH_LESSONS} push={true} />
            </Route>
            <WithPrivateRoute
              isAuthenticated={isAuthenticated}
              path={ROUTE_PATH_LESSONS}
              component={MainLayout}
            />
            <Route path={ROUTE_PATH_AUTH} component={AuthLayout} />
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state: GlobalState) => ({
  [PROP_IS_AUTHENTICATED]: isAuthenticated$(state),
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators({ onFetchUserData }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
