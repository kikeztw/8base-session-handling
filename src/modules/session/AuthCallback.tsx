import { useAuth0 } from '@auth0/auth0-react';
import React, { useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { OnTokenFetched } from './session-events';
import { AUTH_CLIENT_ID, AUTH_LOGOUT_URL } from '../../shared/constants';

export const AuthCallback: React.FC = () => {
  const { isLoading, logout, getIdTokenClaims } = useAuth0();
  const history = useHistory();

  const fetchToken = useCallback(async () => {
    if (!isLoading) {
      let token;
  
      try {
        token = await getIdTokenClaims();
      } catch (e) {
        return logout({
          client_id: AUTH_CLIENT_ID,
          returnTo: AUTH_LOGOUT_URL,
        });
      }
  
      if (!token) {
        return logout({
          client_id: AUTH_CLIENT_ID,
          returnTo: AUTH_LOGOUT_URL,
        });
      }
  
      OnTokenFetched.dispatch(token.__raw);

      history.push('/');
    }
  }, [isLoading, logout, getIdTokenClaims, history]);

  useEffect(() => {
    fetchToken();
  }, [fetchToken]);

  return (
    <h1>Loading...</h1>
  )
}