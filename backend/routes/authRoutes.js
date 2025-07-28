const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticateToken, redirectBasedOnRole } = require('../middlewares/authMiddleware');

// Admin Auth Routes
router.post('/admin/register', authController.registerAdmin);
router.post('/admin/login', authController.loginAdmin);

// Professor Auth Routes
router.post('/professor/register', authController.registerProfessor);
router.post('/professor/login', authController.loginProfessor);

// Student Auth Routes
router.post('/student/register', authController.registerStudent);
router.post('/student/login', authController.loginStudent);

// Route to get role-based redirection path
router.get('/redirect', authenticateToken, redirectBasedOnRole);

module.exports = router;
