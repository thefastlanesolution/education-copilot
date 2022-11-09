import express from 'express';
const router = express.Router();

import { newCompletion } from '../controllers/completionController.js';

router.route('/').post(newCompletion);

router.post('/realLifeBenefits', (req, res) => {
  console.log('RealLifeBenefits api call ===');
  newCompletion(req, res);
  // res.send('RealLifeBenefits');
});

export default router;
