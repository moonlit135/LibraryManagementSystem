const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Student } = require('../models');
require('dotenv').config();

// Register a new student
exports.registerStudent = async (req, res) => {
  try {
    const { name, department, course, roll_no, password, email } = req.body;

    // Check if roll_no or email already exists
    const existingStudent = await Student.findOne({ where: { roll_no } });
    const existingEmail = await Student.findOne({ where: { email } });

    if (existingStudent || existingEmail) {
      return res.status(400).json({ message: 'Roll number or Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newStudent = await Student.create({
      name,
      department,
      course,
      roll_no,
      password: hashedPassword,
      email,
    });

    res.status(201).json({ message: 'Student registered successfully', student: newStudent });
  } catch (error) {
    console.error('Error registering student:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Student login
exports.loginStudent = async (req, res) => {
  try {
    const { roll_no, password } = req.body;

    const student = await Student.findOne({ where: { roll_no } });

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const isMatch = await bcrypt.compare(password, student.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: student.id, role: 'student', roll_no: student.roll_no },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error logging in student:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.findAll();
    res.json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a single student by ID
exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
  } catch (error) {
    console.error('Error fetching student:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a student
exports.updateStudent = async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });

    const { name, department, course, roll_no, email, password } = req.body;

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      student.password = hashedPassword;
    }

    student.name = name || student.name;
    student.department = department || student.department;
    student.course = course || student.course;
    student.roll_no = roll_no || student.roll_no;
    student.email = email || student.email;

    await student.save();
    res.json({ message: 'Student updated successfully', student });
  } catch (error) {
    console.error('Error updating student:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a student
exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });

    await student.destroy();
    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    console.error('Error deleting student:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
