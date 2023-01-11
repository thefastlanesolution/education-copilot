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
import { lessonPlannerV2Completion } from '../controllers/AI Tools/lessonPlanV2Controller.js';
import { educationalHandoutCompletion } from '../controllers/AI Tools/educationalController.js';
import { unitOverviewCompletion } from '../controllers/Unit Planner/unitOverviewCompletion.js';
import { studentObjectivesCompletion } from '../controllers/Unit Planner/studentObjectivesCompletion.js';
import { essentialQuestionsCompletion } from '../controllers/Unit Planner/essentialQuestionsCompletion.js';
import { contextBuilderCompletionUnit } from '../controllers/Unit Planner/contextBuilderCompletionUnit.js';
import { educationalHandoutCompletionUnit } from '../controllers/Unit Planner/educationalHandoutCompletionUnit.js';
import { unitIdeaCompletion } from '../controllers/Unit Planner/unitIdeaCompletion.js';
import { unitObjectivesCompletion } from '../controllers/Unit Planner/unitObjectivesCompletion.js';
import { lessonPlanCompletionUnit } from '../controllers/Unit Planner/lessonPlanCompletionUnit.js';
import { powerPointCompletionUnit } from '../controllers/Unit Planner/powerPointCompletionUnit.js';
import { lessonOverviewCompletion } from '../controllers/Unit Planner/lessonOverviewCompletion.js';
import { lessonIdeaCompletion } from '../controllers/AI Tools/lessonPlanV2Ideas.js';
import { quizGeneratorCompletion } from '../controllers/AI Tools/quizGeneratorController.js';
import { quizCoversCompletion } from '../controllers/AI Tools/quizCoversController.js';
import { quizQuestionCompletion } from '../controllers/AI Tools/quizQuestionController.js';

// quizQuestionCompletion
router.post('/quizQuestionCompletion', (req, res) => {
  console.log('quizQuestionCompletion api call ===');
  quizQuestionCompletion(req, res);
});

// quizCoversCompletion
router.post('/quizCoversCompletion', (req, res) => {
  console.log('quizCoversCompletion api call ===');
  quizCoversCompletion(req, res);
});

// quizGeneratorCompletion
router.post('/quizGeneratorCompletion', (req, res) => {
  console.log('quizGeneratorCompletion api call ===');
  quizGeneratorCompletion(req, res);
});

// lessonIdeaCompletion
router.post('/lessonIdeaCompletion', (req, res) => {
  console.log('lessonIdeaCompletion api call ===');
  lessonIdeaCompletion(req, res);
});

// lessonOverviewCompletion
router.post('/lessonOverviewCompletion', (req, res) => {
  console.log('lessonOverviewCompletion api call ===');
  lessonOverviewCompletion(req, res);
});

// powerPointCompletionUnit
router.post('/powerPointCompletionUnit', (req, res) => {
  console.log('powerPointCompletionUnit api call ===');
  powerPointCompletionUnit(req, res);
});

// lessonPlanCompletionUnit
router.post('/lessonPlanCompletionUnit', (req, res) => {
  console.log('lessonPlanCompletionUnit api call ===');
  lessonPlanCompletionUnit(req, res);
});

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

// Lesson Planner V2
router.post('/lessonPlannerV2Completion', (req, res) => {
  console.log('lessonPlannerV2Completion api call ===');
  lessonPlannerV2Completion(req, res);
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

// Educational Handout Creator V2
router.post('/educationalHandoutCompletion', (req, res) => {
  console.log('educationalHandoutCompletion api call ===');
  educationalHandoutCompletion(req, res);
});

// Unit Overview
router.post('/unitOverviewCompletion', (req, res) => {
  console.log('unitOverviewCompletion api call ===');
  unitOverviewCompletion(req, res);
});

// Student Objectives
router.post('/studentObjectivesCompletion', (req, res) => {
  console.log('studentObjectivesCompletion api call ===');
  studentObjectivesCompletion(req, res);
});

// Essential Questions
router.post('/essentialQuestionsCompletion', (req, res) => {
  console.log('essentialQuestionsCompletion api call ===');
  essentialQuestionsCompletion(req, res);
});

// contextBuilderCompletionUnit
router.post('/contextBuilderCompletionUnit', (req, res) => {
  console.log('contextBuilderCompletionUnit api call ===');
  contextBuilderCompletionUnit(req, res);
});

// educationalHandoutCompletionUnit
router.post('/educationalHandoutCompletionUnit', (req, res) => {
  console.log('educationalHandoutCompletionUnit api call ===');
  educationalHandoutCompletionUnit(req, res);
});

// unitIdeaCompletion
router.post('/unitIdeaCompletion', (req, res) => {
  console.log('unitIdeaCompletion api call ===');
  unitIdeaCompletion(req, res);
});

// unitObjectivesCompletion
router.post('/unitObjectivesCompletion', (req, res) => {
  console.log('unitObjectivesCompletion api call ===');
  unitObjectivesCompletion(req, res);
});

export default router;
