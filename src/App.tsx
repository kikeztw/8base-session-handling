import React from 'react';
import { Auth0Provider } from '@auth0/auth0-react';
import { ApolloProvider } from '@apollo/client';
import { Session } from './modules/session/Session';
import { BrowserRouter, Redirect, Switch, Route } from 'react-router-dom';
import { VisitorsRoute } from './shared/components/VisitorsRoute';
import { client } from './shared/config/apollo-client';
import './App.css';

// Routes
import { Login } from './modules/login/Login';
import { DashoardView } from './modules/dashboard/DashboardView';
import { ProfileView } from './modules/profile/ProfileView';
import { AdminView } from './modules/admin/AdminView';
import { WorkerView } from './modules/worker/WorkerView';
import { Auth } from './modules/Auth/Auth';


function App() {
  return (
    <BrowserRouter>
      <Auth0Provider
        domain={process.env.REACT_APP_CLIENT_DOMAIN || ''}
        clientId={process.env.REACT_APP_AUTH0_CLIENT_ID || ''}
        redirectUri={process.env.REACT_APP_AUTH_CLIENT_REDIRECT_LOGOUT}
      >
        <ApolloProvider client={client}>
          <Switch>
            <VisitorsRoute exact path="/login" component={Login} />
            <Auth>
              <Session>
                <Route exact path="/" component={DashoardView} />
                <Route exact path="/b" component={ProfileView} />
                <Route exact path="/c" component={AdminView} />
                <Route exact path="/d" component={WorkerView} />
              </Session>
            </Auth>   
            </Switch>
        </ApolloProvider>
      </Auth0Provider> 
    </BrowserRouter>
  );
}

export default App;

/*
 <ProtectedRoute exact path="/profile" component={ProfileView} />
<ProtectedRoute perform="admin-page" exact path="/admin" component={AdminView} />
<ProtectedRoute perform="worker-page" exact path="/worker" component={WorkerView} />
*/