import React from 'react';
import './App.css';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home'; // Example import for a Home page component
import { client } from './apollo'; // Import your Apollo Client instance

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/settings" element={<Settings />} />
            {/* Add more routes here as needed */}
          </Routes>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
