const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware');
const upload = require('../middlewares/multer'); // For handling file uploads

// Protect all routes below with Admin-only access
router.use(authMiddleware.protectAdmin);

// Get all professors
router.get('/professors', adminController.getAllProfessors);


router.get('/students', adminController.getAllStudents);


router.get('/books', adminController.getAllBooks);

// Add a new book (with image upload)
router.post('/books', upload.single('image'), adminController.addBook);


router.put('/books/:id', upload.single('image'), adminController.updateBook);


router.delete('/books/:id', adminController.deleteBook);

module.exports = router;
