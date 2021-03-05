import { ApolloClient, InMemoryCache } from '@apollo/client';
import { createLinkConfiguration } from './apollo-link';

export const client = new ApolloClient({
  link: createLinkConfiguration(),
  cache: new InMemoryCache(),
})