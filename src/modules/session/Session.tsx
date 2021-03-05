import React, { useEffect, useState } from 'react';
import { useEvent, useSubscription } from '@cobuildlab/react-simple-state';
import { OnTokenFetched, OnSessionFetch } from './session-events';
import { useApolloClient } from '@apollo/client';
import { createLinkConfiguration } from '../../shared/config/apollo-link';
import { fetchSession } from './session-actions';
import { useAuth0 } from '@auth0/auth0-react';

export const Session: React.FC<Props> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const auth = useAuth0();
  const token = useEvent(OnTokenFetched);
  const client = useApolloClient();

  useEffect(() => {
    if (auth.isLoading === false) {
      /**
       * If auth0 detects a user is authenticated
       * but there is no token, fetch the token
       */
      if (auth.isAuthenticated === true && !token) {
        auth.getIdTokenClaims()
          .then(value => OnTokenFetched.dispatch(value.__raw))
          .catch(e => console.log('getIdTokenClaims', e.message));
      
      /**
       * If there is a token, simply configure the client
       * with that token to fetch the user session
       */
      } else if (token) {
        client.setLink(createLinkConfiguration(token));
  
        fetchSession();
      
      /**
       * If there is no user authenticated,
       * stop loading and continue with the next component
       */
      } else {
        setLoading(false);
      }
    }
  }, [token, client, auth]);

  useSubscription(OnSessionFetch, () => {
    setLoading(false);
  }, [])

  if (loading) {
    return (
      <h1>
        Loading...
      </h1>
    );
  }

  return (
    <>
      {children}
    </>
  );
}

type Props = {
  children: React.ReactNode
}