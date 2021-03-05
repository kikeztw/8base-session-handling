import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

export const ProtectedRoute: React.FC<RouteProps> = ({ component, ...rest }) => {
  const auth = useAuth0();

  return (
    <Route
      {...rest}
      render={({ location }) => auth.isAuthenticated ? (
          <Route 
            component={component}
            {...rest}
          />
        ) : (
          <Redirect
            to={{
              pathname: "/auth",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}