import express from 'express';
const router = express.Router();

import { benefitsCompletion } from '../controllers/AI Tools/realLifeBenefitsController.js';
import { shotgunCompletion } from '../controllers/AI Tools/shotgunIdeaController.js';
import { lessonPlannerCompletion } from '../controllers/AI Tools/lessonPlanController.js';
import { infoHandoutCompletion } from '../controllers/AI Tools/infoHandoutController.js';
import { writingPromptCompletion } from '../controllers/AI Tools/writingPromptController.js';
import { parentEmailsCompletion } from '../controllers/AI Tools/parentEmailController.js';
import { weeklyNewsletterCompletion } from '../controllers/AI Tools/weeklyNewsletterController.js';
import { researchProjectCompletion } from '../controllers/AI Tools/researchProjectController.js';

// router.route('/').post(benefitsCompletion);

// Real Life Benefits
router.post('/benefitsCompletion', (req, res) => {
  console.log('benefitsCompletion api call ===');
  benefitsCompletion(req, res);
  // res.send('RealLifeBenefits');
});

// Real Life Benefits
router.post('/shotgunCompletion', (req, res) => {
  console.log('shotgunCompletion api call ===');
  shotgunCompletion(req, res);
  // res.send('RealLifeBenefits');
});

// Lesson Planner
router.post('/lessonPlannerCompletion', (req, res) => {
  console.log('lessonPlannerCompletion api call ===');
  lessonPlannerCompletion(req, res);
  // res.send('RealLifeBenefits');
});

// Real Life Benefits
router.post('/infoHandoutCompletion', (req, res) => {
  console.log('infoHandoutCompletion api call ===');
  infoHandoutCompletion(req, res);
  // res.send('RealLifeBenefits');
});

// Real Life Benefits
router.post('/writingPromptCompletion', (req, res) => {
  console.log('writingPromptCompletion api call ===');
  writingPromptCompletion(req, res);
  // res.send('RealLifeBenefits');
});

// Real Life Benefits
router.post('/parentEmailsCompletion', (req, res) => {
  console.log('parentEmailsCompletion api call ===');
  parentEmailsCompletion(req, res);
  // res.send('RealLifeBenefits');
});

// Real Life Benefits
router.post('/weeklyNewsletterCompletion', (req, res) => {
  console.log('weeklyNewsletterCompletion api call ===');
  weeklyNewsletterCompletion(req, res);
  // res.send('RealLifeBenefits');
});

// Research Project Template
router.post('/researchProjectCompletion', (req, res) => {
  console.log('researchProjectCompletion api call ===');
  researchProjectCompletion(req, res);
  // res.send('RealLifeBenefits');
});

export default router;
