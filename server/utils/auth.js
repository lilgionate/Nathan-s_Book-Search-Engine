const jwt = require('jsonwebtoken');

// set token secret and expiration date
const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  // function for our authenticated routes
  authMiddleware: function ({ req }) {
    // allows token to be sent via headers
    let token = req.headers.authorization || '';

    if (!token) {
      return { user: null };
    }

    try {
      // Verify token and extract user data
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      const user = data;
      return { user };
    } catch (err) {
      console.error('Invalid token', err);
      return { user: null };
    }
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};