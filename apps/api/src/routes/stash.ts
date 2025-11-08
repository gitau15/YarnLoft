import express from 'express';
import { createApiResponse } from '../utils/api';

const router = express.Router();

// Stash management routes will be implemented here
router.get('/', (req, res) => {
  createApiResponse(res, 200, [], 'Stash endpoint - coming soon');
});

module.exports = router;