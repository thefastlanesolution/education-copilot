import mongoose from 'mongoose';

const FeedbackSchema = new mongoose.Schema(
  {
    userId: {
      type: Number,
      required: [true, 'Please provide student ID'],
    },
    prompt: {
      type: String,
      required: [true, 'Please provide feedback'],
    },
    completion: {
      type: String,
      required: [true, 'Please provide feedback'],
    },
    vote: {
      type: String,
      required: [true, 'Please provide feedback'],
    },
  },
  { timestamps: true }
);

export default mongoose.model('Feedback', FeedbackSchema);
