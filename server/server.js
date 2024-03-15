const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas'); // Import your GraphQL schema files
const { authMiddleware } = require('./utils/auth'); // Import any middleware for authentication

// Create an Express app
const app = express();

// Set up Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware, // Optional: Apply authentication middleware
});

// Start the Apollo Server
server.start().then(() => {
  // Apply Apollo Server middleware to Express app
  server.applyMiddleware({ app });

  // Define port
  const PORT = process.env.PORT || 3000;

  // Start Express server
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}${server.graphqlPath}`);
  });
});