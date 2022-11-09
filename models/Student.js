import mongoose from 'mongoose';

const StudentSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'Please provide first name'],
      maxlength: 50,
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'Please provide last name'],
      maxlength: 50,
      trim: true,
    },
    birthDate: {
      type: Date,
    },
    studentEmail: {
      type: String,
      default: '',
      trim: true,
    },
    parentFirstName: {
      type: String,
      maxlength: 50,
      default: '',
      trim: true,
    },
    parentLastName: {
      type: String,
      maxlength: 50,
      default: '',
      trim: true,
    },
    parentEmail: {
      type: String,
      default: '',
      trim: true,
    },
    parentPhone: {
      type: String,
      default: '',
      trim: true,
    },
    status: {
      type: String,
      enum: ['active', 'not active', 'on leave'],
      default: 'active',
    },
  },
  { timestamps: true }
);

export default mongoose.model('Student', StudentSchema);
