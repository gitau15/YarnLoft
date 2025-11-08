import express from 'express';
import { createApiResponse } from '../utils/api';

const router = express.Router();

// Shopping cart routes will be implemented here
router.get('/', (req, res) => {
  createApiResponse(res, 200, { items: [], total: 0 }, 'Cart endpoint - coming soon');
});

module.exports = router;