const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const { authenticateToken, authorizeRoles } = require('../middlewares/authMiddleware');

// Middleware to ensure only admin can access these routes
const adminOnly = authorizeRoles('Admin');

// All routes are protected and require admin access

// Get all students (Admin only)
router.get('/', authenticateToken, adminOnly, studentController.getAllStudents);

// Get student by ID (Admin only)
router.get('/:id', authenticateToken, adminOnly, studentController.getStudentById);

// Update student (Admin only)
router.put('/:id', authenticateToken, adminOnly, studentController.updateStudent);

// Delete student (Admin only)
router.delete('/:id', authenticateToken, adminOnly, studentController.deleteStudent);

// Student registration and profile management routes

// @route   POST /api/students/register
// @desc    Register a new student (initial step before OTP verification)
// @access  Public
router.post('/register', studentController.registerStudent);

// @route   PUT /api/students/complete-registration
// @desc    Complete student registration after OTP verification
// @access  Private (protected by OTP verification)
router.put('/complete-registration', studentController.completeRegistration);

// @route   GET /api/students/profile/:id
// @desc    Get student profile
// @access  Private (protected by JWT)
router.get('/profile/:id', authenticateToken, studentController.getStudentProfile);

module.exports = router;
