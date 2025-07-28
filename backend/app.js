const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// environment variables
dotenv.config();

// App setup
const app = express();
app.use(cors());
app.use(express.json());

// Import route files
const bookRoutes = require('./routes/bookRoutes');
const adminRoutes = require('./routes/adminRoutes');
const studentRoutes = require('./routes/studentRoutes');
const professorRoutes = require('./routes/professorRoutes');
const studentIssueRoutes = require('./routes/studentBookIssueRoutes');
const professorIssueRoutes = require('./routes/professorBookIssueRoutes');

// API Routes
app.use('/api/books', bookRoutes);
app.use('/api/admins', adminRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/professors', professorRoutes);
app.use('/api/student-issues', studentIssueRoutes);
app.use('/api/professor-issues', professorIssueRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Library Management System API is running...');
});

module.exports = app;
