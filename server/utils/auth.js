const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server-express');

// set token secret and expiration date
const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  authMiddleware: function ({ req }) {
    // allows token to be sent via context
    let token = req.headers.authorization || '';

    if (!token) {
      return { user: null };
    }

    try {
      // Extract the token from the "Bearer <token>" format
      token = token.split(' ')[1];
      // Verify token and extract user data
      const { data } = jwt.verify(token, secret);
      const user = data;
      return { user };
    } catch (err) {
      throw new AuthenticationError('Invalid token');
    }
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};