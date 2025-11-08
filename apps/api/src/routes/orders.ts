import express from 'express';
import { createApiResponse } from '../utils/api';

const router = express.Router();

// Order routes will be implemented here
router.get('/', (req, res) => {
  createApiResponse(res, 200, [], 'Orders endpoint - coming soon');
});

module.exports = router;