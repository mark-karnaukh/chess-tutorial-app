// Libs
import React from 'react';

// Components
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';

// Constants
import { PROP_IS_LOADING } from '../constants';

// Local types
export interface Props {
  [PROP_IS_LOADING]: boolean;
  [key: string]: any;
}

export default (Component: any) => ({ isLoading, ...restProps }: Props) => (
  <React.Fragment>
    {isLoading ? (
      <Container
        className={'d-flex justify-content-center align-items-center bg-white'}
        style={{ height: '100vh' }}
      >
        <Spinner animation="border" />
      </Container>
    ) : (
      <Component {...restProps} />
    )}
  </React.Fragment>
);
