// apollo.js
import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:PORT/graphqlPath',
  cache: new InMemoryCache()
});

export { client };