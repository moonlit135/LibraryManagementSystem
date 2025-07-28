const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const { authenticateToken, authorizeRoles } = require('../middlewares/authMiddleware');

// Middleware to ensure only admins can modify books
const adminOnly = authorizeRoles('Admin');

// Get all books (public access)
router.get('/books', bookController.getAllBooks);

// Get a specific book by ID (public access)
router.get('/books/:id', bookController.getBookById);

// Protected routes (admin only)
// Create a new book
router.post('/books', authenticateToken, adminOnly, bookController.createBook);

// Update a book by ID
router.put('/books/:id', authenticateToken, adminOnly, bookController.updateBook);

// Delete a book by ID
router.delete('/books/:id', authenticateToken, adminOnly, bookController.deleteBook);

module.exports = router;
