import React, { useEffect } from 'react';
import { fetchSession } from './session-actions';
import { useAuth0 } from '@auth0/auth0-react';

export const Session: React.FC<Props> = ({ children }) => {
  const { isAuthenticated } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
       fetchSession();
    } 
  }, [isAuthenticated]);

  return (
    <>
      {children}
    </>
  );
}

type Props = {
  children: React.ReactNode
}