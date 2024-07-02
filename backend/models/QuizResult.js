const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuizResultSchema = new Schema({
  quizId: { type: Schema.Types.ObjectId, ref: 'Quiz', required: true },
  studentId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  score: { type: Number, required: true },
  answers: [{ type: String, required: true }]
});

module.exports = mongoose.model('QuizResult', QuizResultSchema);
