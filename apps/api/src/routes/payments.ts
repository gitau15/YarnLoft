import express from 'express';
import { createApiResponse } from '../utils/api';

const router = express.Router();

// Payment processing routes will be implemented here
router.post('/stripe/create-intent', (req, res) => {
  createApiResponse(res, 200, null, 'Stripe payment endpoint - coming soon');
});

module.exports = router;