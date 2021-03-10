import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useApolloClient } from '@apollo/client';
import { IdToken, useAuth0 } from '@auth0/auth0-react';
/*
import {
  CURRENT_USER_QUERY,
  USER_SIGN_UP_MUTATION,
} from './auth-callback-queries';
*/
import { createLinkConfiguration } from '../../shared/config/apollo-link'


export const Auth: React.FC = ({ children }) => {
  const history = useHistory();
  const client = useApolloClient();
  const [loading, setLoading] = useState(true);
  const { getIdTokenClaims, isAuthenticated, isLoading, /* loginWithRedirect*/ } = useAuth0();

  useEffect(() => {
    const handleAuthentication = async (): Promise<void> => {
      // const { email, name } = user;
      let token: IdToken;
      try {
        token = await getIdTokenClaims();
      } catch (error) {
        throw new Error(error);
      }

      // eslint-disable-next-line no-underscore-dangle
      // OnTokenEvent.dispatch({ token: token.__raw });
      client.setLink(createLinkConfiguration(token.__raw));


      /*
        try {
          await client.query({
            query: CURRENT_USER_QUERY,
          });
        } catch (error) {
          console.log('error r', error);
          const firstName = name;
          await client.mutate({
            mutation: USER_SIGN_UP_MUTATION,
            variables: {
              user: { email, firstName },
              authProfileId: process.env.REACT_APP_8BASE_AUTH_PROFILE_ID,
            },
          });
        }
      */

      setTimeout(() => {
        if (token) {
          setLoading(false);
        }
      }, 5000)
      
    };

    if(!isLoading){
      if (isAuthenticated) {
        console.log('estoy autenticado')
        handleAuthentication();
      }else{
        setLoading(false);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isLoading]);


  if(loading){
    return (
      <div>loading....</div>
    )
  }

  return (
    <>
      {children}
    </>
  );
};