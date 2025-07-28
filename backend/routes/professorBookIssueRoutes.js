const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRoles } = require('../middlewares/authMiddleware');
const professorBookIssueController = require('../controllers/professorBookIssueController');

// Middleware to ensure only admins can access these routes
const adminOnly = authorizeRoles('Admin');

// Get all professor book issues (Admin only)
router.get('/', authenticateToken, adminOnly, professorBookIssueController.getAllProfessorBookIssues);

// Get professor book issues by professor ID (Admin or the professor themselves)
router.get('/professor/:professorId', authenticateToken, professorBookIssueController.getProfessorBookIssuesByProfessorId);

// Get a specific professor book issue by ID (Admin or the professor themselves)
router.get('/:id', authenticateToken, professorBookIssueController.getProfessorBookIssueById);

// Create a new professor book issue (Admin only)
router.post('/', authenticateToken, adminOnly, professorBookIssueController.createProfessorBookIssue);

// Update a professor book issue by ID (Admin only)
router.put('/:id', authenticateToken, adminOnly, professorBookIssueController.updateProfessorBookIssue);

// Delete a professor book issue by ID (Admin only)
router.delete('/:id', authenticateToken, adminOnly, professorBookIssueController.deleteProfessorBookIssue);

module.exports = router;
