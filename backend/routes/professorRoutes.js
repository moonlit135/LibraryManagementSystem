const express = require('express');
const router = express.Router();
const professorController = require('../controllers/professorController');
const { authenticateToken, authorizeRoles } = require('../middlewares/authMiddleware');

// Middleware to ensure only professors can access these routes
const professorOnly = authorizeRoles('Professor');

// Public Routes
router.post('/register', professorController.registerProfessor);
router.post('/login', professorController.loginProfessor);

// Protected Routes (only accessible by authenticated professors/admins)
router.get('/', authenticateToken, professorOnly, professorController.getAllProfessors);
router.get('/:id', authenticateToken, professorOnly, professorController.getProfessorById);
router.put('/:id', authenticateToken, professorOnly, professorController.updateProfessor);
router.delete('/:id', authenticateToken, professorOnly, professorController.deleteProfessor);

module.exports = router;
