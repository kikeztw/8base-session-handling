import { useAuth0 } from '@auth0/auth0-react';
import { useEvent } from '@cobuildlab/react-simple-state';
import React, { useCallback } from 'react';
import { OnSessionFetch } from '../session/session-events';
import { AUTH_CLIENT_ID, AUTH_REDIRECT_URL } from '../../shared/constants';

export const ProfileView: React.FC = () => {
  const { logout } = useAuth0();
  const user = useEvent(OnSessionFetch);

  const handleLogout = useCallback(() => {
    logout({
      client_id: AUTH_CLIENT_ID,
      returnTo: AUTH_REDIRECT_URL,
    })
  }, [logout]);

  return (
    <div>
      <h1>Profile</h1>
      <h2>{user?.email}</h2>
      {user &&
        <button onClick={handleLogout}>
          Logout
        </button>      
      }
    </div>
  )
}