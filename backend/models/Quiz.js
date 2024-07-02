const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  answer: { type: String, required: true }
});

const QuizSchema = new Schema({
  title: { type: String, required: true },
  teacherId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  quizCode: { type: String, unique: true, required: true },
  questions: [QuestionSchema]
});

module.exports = mongoose.model('Quiz', QuizSchema);
