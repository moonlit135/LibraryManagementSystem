const { Admin, Book, Professor, Student } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cloudinary = require('../config/cloudinary');
const { Op } = require('sequelize');

// Middleware-protected: Only Admins can access these routes



// get all professors 
exports.getAllProfessors = async (req, res) => {
  try {
    const professors = await Professor.findAll();
    res.json(professors);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch professors', error });
  }
};

//  get all students by admin
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.findAll();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch students', error });
  }
};

//  Add a Book (with optional Cloudinary image) 
exports.addBook = async (req, res) => {
  try {
    const { title, author, category, copies } = req.body;
    let imageUrl = null;

    // If image uploaded
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      imageUrl = result.secure_url;
    }

    const book = await Book.create({
      title,
      author,
      category,
      copies,
      image: imageUrl,
    });

    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add book', error });
  }
};

//  Delete Book 
exports.deleteBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const deleted = await Book.destroy({ where: { id: bookId } });

    if (!deleted) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete book', error });
  }
};

//Update Book Info 
exports.updateBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const { title, author, category, copies } = req.body;

    const book = await Book.findByPk(bookId);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    // Update image if file is uploaded
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      book.image = result.secure_url;
    }

    // Update fields
    book.title = title || book.title;
    book.author = author || book.author;
    book.category = category || book.category;
    book.copies = copies || book.copies;

    await book.save();
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update book', error });
  }
};

// View All Books 
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch books', error });
  }
};

