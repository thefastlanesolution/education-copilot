import mongoose from 'mongoose';

const CompletionSchema = new mongoose.Schema(
  {
    prompt: {
      type: String,
      required: [true, 'Please provide feedback'],
    },
    completion: {
      type: String,
      required: [true, 'Please provide feedback'],
    },
  },
  { timestamps: true }
);

export default mongoose.model('Feedback', CompletionSchema);
