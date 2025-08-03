const User = require('../models/User');
const { generateToken } = require('../utils/jwt');
const { successResponse, errorResponse } = require('../utils/responses');

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findByEmail(email);
    if (!user) {
      return errorResponse(res, 'Invalid email or password', 401);
    }

    // Check password
    const isValidPassword = await user.checkPassword(password);
    if (!isValidPassword) {
      return errorResponse(res, 'Invalid email or password', 401);
    }

    // Generate token
    const token = generateToken({ userId: user.id, email: user.email });

    return successResponse(res, {
      user: user.toJSON(),
      token,
      tokenType: 'Bearer'
    }, 'Login successful');

  } catch (error) {
    next(error);
  }
};

const getCurrentUser = async (req, res, next) => {
  try {
    return successResponse(res, req.user.toJSON(), 'User retrieved successfully');
  } catch (error) {
    next(error);
  }
};

const refreshToken = async (req, res, next) => {
  try {
    // Generate new token for current user
    const token = generateToken({ userId: req.user.id, email: req.user.email });
    
    return successResponse(res, {
      token,
      tokenType: 'Bearer'
    }, 'Token refreshed successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
  getCurrentUser,
  refreshToken
};