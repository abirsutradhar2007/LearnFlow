import mongoose from 'mongoose';

export const genreOptions = [
  "Computer Science",
  "Science",
  "Mathematics",
  "Economics & Finance",
  "History & Geography",
  "Psychology & Philosophy"
];


const learningMaterialSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  videoId: {
    type: String,
    required: true
  },
  videoUrl: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: true
  },
  notes: [{
    title: { type: String, required: true },
    content: { type: String, required: true }
  }],
  flashcards: [{
    question: { type: String, required: true },
    answer: { type: String, required: true }
  }],
  quiz: [{
    question: { type: String, required: true },
    options: [{ type: String, required: true }],
    correctAnswerIndex: { type: Number, required: true, min: 0 },
    explanation: { type: String, required: true }
  }],
  genre: {
    type: String,
    enum: genreOptions,
    required: true
  },
}, {
  timestamps: true
});

learningMaterialSchema.index({ user: 1, videoId: 1 }, { unique: true });

const LearningMaterial = mongoose.model('LearningMaterial', learningMaterialSchema);

export default LearningMaterial;