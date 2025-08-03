const express = require('express');
const router = express.Router();

const { login, getCurrentUser, refreshToken } = require('../controllers/authController');
const { authenticateToken } = require('../middleware/auth');
const { loginValidationRules, validate } = require('../utils/validation');

// POST /api/auth/login
router.post('/login', loginValidationRules(), validate, login);

// GET /api/auth/me
router.get('/me', authenticateToken, getCurrentUser);

// POST /api/auth/refresh
router.post('/refresh', authenticateToken, refreshToken);

module.exports = router;