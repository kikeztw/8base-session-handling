import React from 'react';
import { Auth0Provider } from '@auth0/auth0-react';
import { ApolloProvider } from '@apollo/client';
import { Session } from './modules/session/Session';
import { BrowserRouter as Router, Redirect, Switch, Route } from 'react-router-dom';
import { ProtectedRoute } from './shared/components/ProtectedRoute';
import { client } from './shared/config/apollo-client';
import { AUTH_CLIENT_DOMAIN, AUTH_CLIENT_ID, AUTH_REDIRECT_URL } from './shared/constants';
import './App.css';

// Routes
import { DashoardView } from './modules/dashboard/DashboardView';
import { ProfileView } from './modules/profile/ProfileView';
import { AuthView } from './modules/session/AuthView';
import { AuthCallback } from './modules/session/AuthCallback';

function App() {
  return (
    <Auth0Provider
      domain={AUTH_CLIENT_DOMAIN}
      clientId={AUTH_CLIENT_ID}
      redirectUri={AUTH_REDIRECT_URL}
    >
      <ApolloProvider client={client}>
        <Session>
          <Router>
            <Switch>
              <Route exact path="/auth" component={AuthView} />
              <Route exact path="/auth/callback" component={AuthCallback} />
              <Route exact path="/dashboard" component={DashoardView} />
              <ProtectedRoute exact path="/profile" component={ProfileView} />
              <Redirect to="/dashboard" />
            </Switch>
          </Router>
        </Session>
      </ApolloProvider>
    </Auth0Provider>
  );
}

export default App;
