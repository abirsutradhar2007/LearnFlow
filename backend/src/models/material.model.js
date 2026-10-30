import mongoose from 'mongoose';

const learningMaterialSchema = new mongoose.Schema({
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
  }]
}, {
  timestamps: true
});

const LearningMaterial = mongoose.model('LearningMaterial', learningMaterialSchema);

export default LearningMaterial;