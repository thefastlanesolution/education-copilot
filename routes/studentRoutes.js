import express from 'express';
const router = express.Router();

import {
  createStudent,
  deleteStudent,
  getAllStudents,
  updateStudent,
  showStats,
} from '../controllers/studentController.js';

router.route('/').post(createStudent).get(getAllStudents);
// remember about :id
router.route('/stats').get(showStats);
router.route('/:id').delete(deleteStudent).patch(updateStudent);

export default router;
