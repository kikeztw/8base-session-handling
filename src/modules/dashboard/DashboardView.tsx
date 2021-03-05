import { useAuth0 } from '@auth0/auth0-react';
import { useEvent } from '@cobuildlab/react-simple-state';
import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { OnSessionFetch } from '../session/session-events';
import { AUTH_CLIENT_ID, AUTH_REDIRECT_URL } from '../../shared/constants';

export const DashoardView: React.FC = () => {
  const { logout } = useAuth0();
  const history = useHistory();
  const user = useEvent(OnSessionFetch);

  const handleLogout = useCallback(() => {
    logout({
      client_id: AUTH_CLIENT_ID,
      returnTo: AUTH_REDIRECT_URL,
    })
  }, [logout]);

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Welcome {user ? user.email : 'Guest'}</h2>
      {user ? (
        <button onClick={handleLogout}>
          Logout
        </button>
      ) : (
        <button onClick={() => history.push('/auth')}>
          Login
        </button>
      )}
    </div>
  )
}