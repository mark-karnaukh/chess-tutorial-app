// Libs
import React from 'react';

// Components
import { Route, Redirect } from 'react-router-dom';

// Constants
import { ROUTE_PATH_AUTH } from '../constants';

// Imported types
import { RouteProps } from 'react-router-dom';

// Local types
export interface Props extends RouteProps {
  isAuthenticated: boolean;
  component: any;
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
