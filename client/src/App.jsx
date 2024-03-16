import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'; // Import ApolloClient and InMemoryCache
import './App.css';
import { Outlet } from 'react-router-dom';

import Navbar from './components/Navbar';

// Create an ApolloClient instance
const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <>
        <Navbar />
        <Outlet />
      </>
    </ApolloProvider>
  );
}

export default App;