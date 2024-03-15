import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:3001', // Replace this with your GraphQL endpoint
  cache: new InMemoryCache(),
});

export default client;