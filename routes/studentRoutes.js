import express from 'express';
const router = express.Router();

import {
  createStudent,
  getAllStudents,
} from '../controllers/studentController.js';

router.route('/').post(createStudent).get(getAllStudents);

export default router;
