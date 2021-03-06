import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

export const VisitorsRoute: React.FC<Props> = ({ component, ...rest}) => {
  const { isAuthenticated } = useAuth0()
  const Component = component;

  return (
    <Route 
      {...rest}
      render={(routeProps) => isAuthenticated ? (
        <Redirect to="/" />
      ) : (
        <Component {...routeProps} />
      )}
    />
  );
}

interface Props extends RouteProps {
  component: React.ComponentType<any>
}

export default VisitorsRoute; 