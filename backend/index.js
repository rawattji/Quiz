const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/auth');
const quizRoutes = require('./routes/quiz');
app.use('/api/auth', authRoutes);
app.use('/api/quiz', quizRoutes);

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/quiz-app', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
