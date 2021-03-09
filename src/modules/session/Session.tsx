import React, { useEffect, useState } from 'react';
import { useSubscription } from '@cobuildlab/react-simple-state';
import { OnSessionFetch } from './session-events';
import { fetchSession } from './session-actions';
import { useAuth0 } from '@auth0/auth0-react';

export const Session: React.FC<Props> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
       fetchSession();
    } 
  }, [isAuthenticated]);

  useSubscription(OnSessionFetch, () => {
    setLoading(false);
  }, [])

  if (loading) {
    return (
      <h1>
        session Loading...
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