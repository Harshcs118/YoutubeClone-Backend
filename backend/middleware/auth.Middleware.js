const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to protect routes
const protect = async (req, res, next) => {
  let token;

  // Check if the authorization header exists and starts with "Bearer"
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Extract token from the Authorization header
      token = req.headers.authorization.split(' ')[1];

      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Ensure the decoded data contains a valid user ID
      if (!decoded.id) {
        return res.status(401).json({ message: 'Invalid token data' });
      }

      // Attach user data to the request
      req.user = await User.findById(decoded.id).select('-password');

      // Ensure the user exists in the database
      if (!req.user) {
        return res.status(404).json({ message: 'User not found' });
      }

      next(); // Proceed to the next middleware or route handler
    } catch (error) {
      console.error('Token verification error:', error);

      // Handle token expiration or invalid token errors
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token expired' });
      } else if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ message: 'Invalid token' });
      }

      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    // No token provided in the Authorization header
    res.status(401).json({ message: 'Not authorized, no token provided' });
  }
};

module.exports = { protect };
