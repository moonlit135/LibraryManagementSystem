const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRoles } = require('../middlewares/authMiddleware');
const studentBookIssueController = require('../controllers/studentBookIssueController');

// Middleware to ensure only admins can access these routes
const adminOnly = authorizeRoles('Admin');

// Get all student book issues (Admin only)
router.get('/', authenticateToken, adminOnly, studentBookIssueController.getAllStudentBookIssues);

// Get student book issues by student ID (Admin or the student themselves)
router.get('/student/:studentId', authenticateToken, studentBookIssueController.getStudentBookIssuesByStudentId);

// Get a specific student book issue by ID (Admin or the student themselves)
router.get('/:id', authenticateToken, studentBookIssueController.getStudentBookIssueById);

// Create a new student book issue (Admin only)
router.post('/', authenticateToken, adminOnly, studentBookIssueController.createStudentBookIssue);

// Update a student book issue by ID (Admin only)
router.put('/:id', authenticateToken, adminOnly, studentBookIssueController.updateStudentBookIssue);

// Delete a student book issue by ID (Admin only)
router.delete('/:id', authenticateToken, adminOnly, studentBookIssueController.deleteStudentBookIssue);

module.exports = router;
