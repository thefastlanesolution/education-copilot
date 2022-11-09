import mongoose from 'mongoose';

const FeedbackSchema = new mongoose.Schema(
  {
    studentId: {
      type: Number,
      required: [true, 'Please provide student ID'],
    },
    feedback: {
      type: String,
      required: [true, 'Please provide feedback'],
    },
  },
  { timestamps: true }
);

export default mongoose.model('Feedback', FeedbackSchema);
