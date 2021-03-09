import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';


export const Login: React.FC = () => {
  const { loginWithRedirect } = useAuth0();

  const onClick = (): void => {
    loginWithRedirect();
  }

  return(
    <button onClick={onClick} type="button">
      log in
    </button>
  )
}