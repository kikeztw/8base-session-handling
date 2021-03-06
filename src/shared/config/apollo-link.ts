import {
  createHttpLink,
  from,
  split,
  ApolloLink,  
} from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';
import { setContext } from '@apollo/client/link/context';
import { WORKSPACE_ENDPOINT, WORKSPACE_NAME, WORKSPACE_ID } from '../constants';

export function createLinkConfiguration (token?: string): ApolloLink {
  const httpLink = createHttpLink({ uri: WORKSPACE_ENDPOINT });

  const authLink = setContext((_, { headers }) => ({
    headers: {
      ...headers,
      authorization: `Bearer ${token ? token : process.env.REACT_APP_AUTH_GUEST_TOKEN}`,
    },
  }));

  const wsLink = new WebSocketLink({
    uri: 'wss://ws.8base.com',
    options: {
      reconnect: true,
      connectionParams: {
        token: token ? token : process.env.REACT_APP_AUTH_GUEST_TOKEN,
        workspaceId: WORKSPACE_ID,
        environmentName: WORKSPACE_NAME,
      },
    },
    webSocketImpl: class WebSocketWithoutProtocol extends WebSocket {
      // eslint-disable-next-line @typescript-eslint/no-useless-constructor
      constructor(url: string) {
        super(url);
      }
    },
  });

  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    httpLink,
  );

  return from([authLink, splitLink]);
}