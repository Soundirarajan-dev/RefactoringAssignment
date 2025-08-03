const express = require('express');
const router = express.Router();

const { healthCheck } = require('../controllers/healthController');

// GET /api/health
router.get('/', healthCheck);

module.exports = router;