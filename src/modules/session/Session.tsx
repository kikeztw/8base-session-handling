import React, { useEffect, useState } from 'react';
import { useEvent, useSubscription } from '@cobuildlab/react-simple-state';
import { OnTokenFetched, OnSessionFetch } from './session-events';
import { useApolloClient } from '@apollo/client';
import { createLinkConfiguration } from '../../shared/config/apollo-link';
import { fetchSession } from './session-actions';

export const SessionContext = React.createContext<SessionContextState>({ user: null });

export const Session: React.FC<Props> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const token = useEvent(OnTokenFetched);
  const client = useApolloClient();

  useEffect(() => {
    if (token) {
      client.setLink(createLinkConfiguration(token));

      fetchSession();
    } else {
      setLoading(false);
    }
  }, [token, client]);

  useSubscription(OnSessionFetch, () => {
    setLoading(false);
  }, [])

  if (loading) {
    return (
      <h1>Loading...</h1>
    )
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

type SessionContextState = {
  user: Record<string, string> | null,
  refresh?: () => void
}