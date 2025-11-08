import express from 'express';
import { createApiResponse } from '../utils/api';

const router = express.Router();

// Project routes will be implemented here
router.get('/', (req, res) => {
  createApiResponse(res, 200, [], 'Projects endpoint - coming soon');
});

module.exports = router;