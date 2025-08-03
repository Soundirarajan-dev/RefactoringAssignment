const express = require('express');
const router = express.Router();

const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  searchUsers
} = require('../controllers/userController');

const { authenticateToken, optionalAuth } = require('../middleware/auth');
const { 
  userValidationRules, 
  updateUserValidationRules, 
  validate 
} = require('../utils/validation');

// GET /api/users - Get all users (with optional auth)
router.get('/', optionalAuth, getUsers);

// GET /api/users/search - Search users
router.get('/search', optionalAuth, searchUsers);

// GET /api/users/:id - Get user by ID
router.get('/:id', optionalAuth, getUserById);

// POST /api/users - Create new user (public endpoint for registration)
router.post('/', userValidationRules(), validate, createUser);

// PUT /api/users/:id - Update user (requires auth)
router.put('/:id', authenticateToken, updateUserValidationRules(), validate, updateUser);

// DELETE /api/users/:id - Delete user (requires auth)
router.delete('/:id', authenticateToken, deleteUser);

module.exports = router;