import mongoose from 'mongoose';

const materialSchema = new mongoose.Schema({
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
  notes: {
    type: String,
    required: true
  },
  flashcards: {
    type: [String],
    required: true
  },
  quiz: [{
    question: {
      type: String,
      required: true
    },
    options: {
      type: [String],
      required: true
    },
    correctAnswerIndex: {
      type: Number,
      required: true
    }
  }]
}, { timestamps: true });

const Material = mongoose.model('Material', materialSchema);