import express from 'express';
import { createApiResponse } from '../utils/api';

const router = express.Router();

// User profile routes will be implemented here
router.get('/profile', (req, res) => {
  createApiResponse(res, 200, null, 'User profile endpoint - coming soon');
});

module.exports = router;