import Student from '../models/Student.js';
import { StatusCodes } from 'http-status-codes';
import {
  BadRequestError,
  NotFoundError,
  UnAuthenticatedError,
} from '../errors/index.js';
import checkPermissions from '../utils/checkPermissions.js';
import mongoose from 'mongoose';
import moment from 'moment';

// Async callback function that creates a student

const createStudent = async (req, res) => {
  const { firstName, lastName } = req.body;
  if (!firstName || !lastName) {
    throw new BadRequestError('Please provide all values');
  }
  req.body.createdBy = req.user.userId;
  const student = await Student.create(req.body);
  res.status(StatusCodes.CREATED).json({ student });
};

//get all  students
const getAllStudents = async (req, res) => {
  const { status, sort, search } = req.query;

  const queryObject = {
    createdBy: req.user.userId,
  };
  // add stuff based on condition

  if (status && status !== 'all') {
    queryObject.status = status;
  }
  if (search) {
    queryObject.position = { $regex: search, $options: 'i' };
  }
  // NO AWAIT

  let result = Student.find(queryObject);

  // chain sort conditions

  if (sort === 'latest') {
    result = result.sort('-createdAt');
  }
  if (sort === 'oldest') {
    result = result.sort('createdAt');
  }
  if (sort === 'a-z') {
    result = result.sort('position');
  }
  if (sort === 'z-a') {
    result = result.sort('-position');
  }

  //

  // setup pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const students = await result;

  const totalStudents = await Student.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalStudents / limit);

  res.status(StatusCodes.OK).json({ students, totalStudents, numOfPages });
};
const updateStudent = async (req, res) => {
  const { id: studentId } = req.params;
  const { firstName, lastName } = req.body;

  if (!firstName || !lastName) {
    throw new BadRequestError('Please provide all values');
  }
  const student = await Student.findOne({ _id: studentId });

  if (!student) {
    throw new NotFoundError(`No student with id :${studentId}`);
  }
  // check permissions

  checkPermissions(req.user, student.createdBy);

  const updatedStudent = await Student.findOneAndUpdate(
    { _id: studentId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(StatusCodes.OK).json({ updatedStudent });
};
const deleteStudent = async (req, res) => {
  const { id: studentId } = req.params;

  const student = await Student.findOne({ _id: studentId });

  if (!student) {
    throw new NotFoundError(`No student with id :${studentId}`);
  }

  checkPermissions(req.user, student.createdBy);

  await student.remove();

  res.status(StatusCodes.OK).json({ msg: 'Success! Student removed' });
};
const showStats = async (req, res) => {
  let stats = await Student.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: '$status', count: { $sum: 1 } } },
  ]);
  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
  };

  let monthlyApplications = await Student.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
        count: { $sum: 1 },
      },
    },
    { $sort: { '_id.year': -1, '_id.month': -1 } },
    { $limit: 6 },
  ]);
  monthlyApplications = monthlyApplications
    .map(item => {
      const {
        _id: { year, month },
        count,
      } = item;
      const date = moment()
        .month(month - 1)
        .year(year)
        .format('MMM Y');
      return { date, count };
    })
    .reverse();

  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};

export {
  createStudent,
  deleteStudent,
  getAllStudents,
  updateStudent,
  showStats,
};
