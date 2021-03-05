import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export const AuthView: React.FC = () => {
  const { loginWithRedirect } = useAuth0();

  useEffect(() => {
    loginWithRedirect();
  }, [loginWithRedirect]);

  return (
    <h1>Loading...</h1>
  )
}