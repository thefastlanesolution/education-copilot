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
import { freeStyleCompletion } from '../controllers/AI Tools/freeStyleController.js';
import { studentReportsCompletion } from '../controllers/AI Tools/studentReportsController.js';
import { vocabCompletion } from '../controllers/AI Tools/comprehensiveVocabController.js';
import { englishToSpanishCompletion } from '../controllers/AI Tools/EnglishtoSpanishController.js';
import { powerPointCompletion } from '../controllers/AI Tools/powerPointController.js';

// Real Life Benefits
router.post('/benefitsCompletion', (req, res) => {
  console.log('benefitsCompletion api call ===');
  benefitsCompletion(req, res);
});

// Idea Generator
router.post('/shotgunCompletion', (req, res) => {
  console.log('shotgunCompletion api call ===');
  shotgunCompletion(req, res);
});

// Lesson Planner
router.post('/lessonPlannerCompletion', (req, res) => {
  console.log('lessonPlannerCompletion api call ===');
  lessonPlannerCompletion(req, res);
});

// Informational handout
router.post('/infoHandoutCompletion', (req, res) => {
  console.log('infoHandoutCompletion api call ===');
  infoHandoutCompletion(req, res);
});

// Writing Prompt
router.post('/writingPromptCompletion', (req, res) => {
  console.log('writingPromptCompletion api call ===');
  writingPromptCompletion(req, res);
});

// Free Style
router.post('/freeStyleCompletion', (req, res) => {
  console.log('freeStyleCompletion api call ===');
  freeStyleCompletion(req, res);
});

// Parent Emails
router.post('/parentEmailsCompletion', (req, res) => {
  console.log('parentEmailsCompletion api call ===');
  parentEmailsCompletion(req, res);
});

// Weekly Newsletter
router.post('/weeklyNewsletterCompletion', (req, res) => {
  console.log('weeklyNewsletterCompletion api call ===');
  weeklyNewsletterCompletion(req, res);
});

// Research Project Template
router.post('/researchProjectCompletion', (req, res) => {
  console.log('researchProjectCompletion api call ===');
  researchProjectCompletion(req, res);
});

// Student Reports
router.post('/studentReportsCompletion', (req, res) => {
  console.log('studentReportsCompletion api call ===');
  studentReportsCompletion(req, res);
});

// Comprehensive Vocabulary
router.post('/vocabCompletion', (req, res) => {
  console.log('vocabCompletion api call ===');
  vocabCompletion(req, res);
});

// English to Spanish
router.post('/englishToSpanishCompletion', (req, res) => {
  console.log('englishToSpanishCompletion api call ===');
  englishToSpanishCompletion(req, res);
});

// Powerpoint Creator
router.post('/powerPointCompletion', (req, res) => {
  console.log('powerPointCompletion api call ===');
  powerPointCompletion(req, res);
});

export default router;
