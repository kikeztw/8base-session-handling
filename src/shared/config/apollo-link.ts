import {
  createHttpLink,
  from,
  split,
  ApolloLink,  
} from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';
import { setContext } from '@apollo/client/link/context';

export function createLinkConfiguration (token?: string): ApolloLink {
  const httpLink = createHttpLink({ uri: process.env.REACT_APP_8BASE_WORKSPACE_ENDPOINT });

  console.log('tokne', token);

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
        workspaceId: process.env.REACT_APP_8BASE_WORKSPACE_ID,
        environmentName: process.env.REACT_APP_8BASE_WORKING_MAIN,
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