import express from 'express';
import { createApiResponse } from '../utils/api';

const router = express.Router();

// Pattern routes will be implemented here
router.get('/', (req, res) => {
  createApiResponse(res, 200, [], 'Pattern library endpoint - coming soon');
});

module.exports = router;