// Libs
import React from 'react';

// Components
import { Route, Redirect } from 'react-router-dom';

// Constants
import {
  ROUTE_PATH_AUTH,
  PROP_IS_AUTHENTICATED,
  PROP_COMPONENT,
} from '../constants';

// Imported types
import { RouteProps } from 'react-router-dom';

// Local types
export interface Props extends RouteProps {
  [PROP_IS_AUTHENTICATED]: boolean;
  [PROP_COMPONENT]: any;
}

export default ({ isAuthenticated, component: Component, ...rest }: Props) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated === true ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: ROUTE_PATH_AUTH,
            state: { from: props.location },
          }}
        />
      )
    }
  />
);
