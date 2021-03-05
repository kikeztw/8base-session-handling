import { useAuth0 } from '@auth0/auth0-react';
import { useSubscription } from '@cobuildlab/react-simple-state';
import React, { useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { OnSessionFetch, OnTokenFetched } from './session-events';
import { AUTH_CLIENT_ID, AUTH_REDIRECT_URL } from '../../shared/constants';

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
          returnTo: AUTH_REDIRECT_URL,
        });
      }
  
      if (!token) {
        return logout({
          client_id: AUTH_CLIENT_ID,
          returnTo: AUTH_REDIRECT_URL,
        });
      }
  
      return OnTokenFetched.dispatch(token.__raw);
    }
  }, [isLoading, logout, getIdTokenClaims]);

  useEffect(() => {
    fetchToken();
  }, [fetchToken]);

  useSubscription(OnSessionFetch, () => {
    history.push('/');
  }, [history]);

  return (
    <h1>Loading...</h1>
  )
}