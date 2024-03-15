import React from 'react';
import { ApolloProvider } from '@apollo/client';
import './App.css';
import { Outlet } from 'react-router-dom';

import Navbar from './components/Navbar';
import { client } from './apollo'; // Import your Apollo Client instance

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