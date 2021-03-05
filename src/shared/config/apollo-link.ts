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
  const httpLink = createHttpLink({ uri: "https://api.8base.com/ckddc5uz7005q08mj1qnahqll_main" });

  const authLink = setContext((_, { headers }) => ({
    headers: {
      ...headers,
      authorization: `Bearer ${token ? token : 'guest_token'}`,
    },
  }));

  const wsLink = new WebSocketLink({
    uri: 'wss://ws.8base.com',
    options: {
      reconnect: true,
      connectionParams: {
        token: token ? token : 'guest_token',
        workspaceId: "ckddc5uz7005q08mj1qnahqll",
        environmentName: "main",
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