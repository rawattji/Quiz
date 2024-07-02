const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');
const QuizResult = require('../models/QuizResult');

// Create Quiz
router.post('/create', async (req, res) => {
  const { title, teacherId, questions } = req.body;
  const quizCode = Math.random().toString(36).substring(7);
  try {
    const newQuiz = new Quiz({ title, teacherId, quizCode, questions });
    await newQuiz.save();
    res.status(201).json(newQuiz);
  } catch (error) {
    res.status(500).json({ message: 'Error creating quiz', error });
  }
});

// Get Quiz
router.get('/:quizCode', async (req, res) => {
  const { quizCode } = req.params;
  try {
    const quiz = await Quiz.findOne({ quizCode });
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
    res.status(200).json(quiz);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching quiz', error });
  }
});

// Submit Quiz
router.post('/:quizCode/submit', async (req, res) => {
  const { quizCode } = req.params;
  const { studentId, answers } = req.body;
  try {
    const quiz = await Quiz.findOne({ quizCode });
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

    let score = 0;
    answers.forEach((answer, index) => {
      if (answer === quiz.questions[index].answer) score += 1;
    });

    const quizResult = new QuizResult({ quizId: quiz._id, studentId, score, answers });
    await quizResult.save();
    res.status(201).json({ score });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting quiz', error });
  }
});

module.exports = router;
