const User = require('../models/User');
const { successResponse, errorResponse } = require('../utils/responses');

const getUsers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = Math.min(parseInt(req.query.limit) || 20, 100); // Max 100 per page

    const result = await User.findAll(page, limit);
    
    return successResponse(res, result, 'Users retrieved successfully');
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    if (!id || isNaN(id)) {
      return errorResponse(res, 'Invalid user ID', 400);
    }

    const user = await User.findById(parseInt(id));
    
    if (!user) {
      return errorResponse(res, 'User not found', 404);
    }

    return successResponse(res, user.toJSON(), 'User retrieved successfully');
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.create({ name, email, password });
    
    return successResponse(res, user.toJSON(), 'User created successfully', 201);
  } catch (error) {
    if (error.message === 'User with this email already exists') {
      return errorResponse(res, error.message, 409);
    }
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    if (!id || isNaN(id)) {
      return errorResponse(res, 'Invalid user ID', 400);
    }

    const updateData = {};
    const { name, email, password } = req.body;

    if (name !== undefined) updateData.name = name;
    if (email !== undefined) updateData.email = email;
    if (password !== undefined) updateData.password = password;

    if (Object.keys(updateData).length === 0) {
      return errorResponse(res, 'No valid fields provided for update', 400);
    }

    const user = await User.update(parseInt(id), updateData);
    
    return successResponse(res, user.toJSON(), 'User updated successfully');
  } catch (error) {
    if (error.message === 'User not found') {
      return errorResponse(res, error.message, 404);
    }
    if (error.message === 'Email is already taken') {
      return errorResponse(res, error.message, 409);
    }
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    if (!id || isNaN(id)) {
      return errorResponse(res, 'Invalid user ID', 400);
    }

    await User.delete(parseInt(id));
    
    return successResponse(res, null, 'User deleted successfully');
  } catch (error) {
    if (error.message === 'User not found') {
      return errorResponse(res, error.message, 404);
    }
    next(error);
  }
};

const searchUsers = async (req, res, next) => {
  try {
    const { name } = req.query;
    
    if (!name || name.trim().length < 2) {
      return errorResponse(res, 'Search term must be at least 2 characters', 400);
    }

    const page = parseInt(req.query.page) || 1;
    const limit = Math.min(parseInt(req.query.limit) || 20, 100);

    const result = await User.search(name.trim(), page, limit);
    
    return successResponse(res, result, 'Search completed successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  searchUsers
};