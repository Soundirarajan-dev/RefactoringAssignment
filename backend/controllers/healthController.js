const database = require('../config/database');
const { successResponse, errorResponse } = require('../utils/responses');

const healthCheck = async (req, res, next) => {
  try {
    // Test database connection
    await database.query('SELECT 1');
    
    return successResponse(res, {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      database: 'connected',
      version: '1.0.0',
      environment: process.env.NODE_ENV || 'development'
    }, 'Service is healthy');
    
  } catch (error) {
    return errorResponse(res, 'Service is unhealthy', 503, {
      database: 'disconnected',
      error: error.message
    });
  }
};

module.exports = {
  healthCheck
};