const { errorResponse } = require('../utils/responses');

const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Database constraint errors
  if (err.message && err.message.includes('UNIQUE constraint failed')) {
    return errorResponse(res, 'Email already exists', 409);
  }

  // Validation errors
  if (err.name === 'ValidationError') {
    return errorResponse(res, 'Validation failed', 400, err.errors);
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return errorResponse(res, 'Invalid token', 401);
  }

  if (err.name === 'TokenExpiredError') {
    return errorResponse(res, 'Token expired', 401);
  }

  // Default error
  if (process.env.NODE_ENV === 'production') {
    return errorResponse(res, 'Internal server error', 500);
  } else {
    return errorResponse(res, err.message || 'Internal server error', 500);
  }
};

module.exports = errorHandler;