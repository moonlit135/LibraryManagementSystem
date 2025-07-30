const { Student } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
require('dotenv').config();

// @desc    Register a new student
// @route   POST /api/students/register
// @access  Public
exports.registerStudent = async (req, res) => {
  try {
    const { 
      name, 
      roll_no, 
      department, 
      course, 
      email, 
      password 
    } = req.body;

    // Validate required fields
    if (!name || !roll_no || !department || !course || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Check if student with this email or roll number already exists
    const existingStudent = await Student.findOne({
      where: {
        [Op.or]: [
          { email },
          { roll_no }
        ]
      }
    });

    if (existingStudent) {
      const field = existingStudent.email === email ? 'Email' : 'Roll number';
      return res.status(400).json({
        success: false,
        message: `${field} already exists`
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create student record
    const student = await Student.create({
      name,
      roll_no,
      department,
      course,
      email,
      password: hashedPassword,
      otp: null,
      otpExpiry: null
    });

    // Remove sensitive data before sending response
    const studentData = student.get({ plain: true });
    delete studentData.password;
    delete studentData.otp;
    delete studentData.otpExpiry;

    res.status(201).json({
      success: true,
      message: 'Student registered successfully',
      data: studentData
    });

  } catch (error) {
    console.error('Error in registerStudent:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Complete student registration after OTP verification
// @route   PUT /api/students/complete-registration
// @access  Private
exports.completeRegistration = async (req, res) => {
  try {
    const { email, ...studentData } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }

    // Find the temporary student record
    const student = await Student.findOne({ where: { email } });
    
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found or registration session expired'
      });
    }

    // Hash password if provided
    if (studentData.password) {
      const salt = await bcrypt.genSalt(10);
      studentData.password = await bcrypt.hash(studentData.password, salt);
    }

    // Update student record with final registration data
    await student.update({
      ...studentData,
      otp: null,          // Clear OTP after successful registration
      otpExpiry: null     // Clear OTP expiry
    });

    // Remove sensitive data before sending response
    const updatedStudent = student.get({ plain: true });
    delete updatedStudent.password;
    delete updatedStudent.otp;
    delete updatedStudent.otpExpiry;

    res.status(200).json({
      success: true,
      message: 'Registration completed successfully',
      data: updatedStudent
    });

  } catch (error) {
    console.error('Error in completeRegistration:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get student profile
// @route   GET /api/students/profile/:id
// @access  Private
exports.getStudentProfile = async (req, res) => {
  try {
    const { id } = req.params;
    
    const student = await Student.findByPk(id, {
      attributes: { exclude: ['password', 'otp', 'otpExpiry'] }
    });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    res.status(200).json({
      success: true,
      data: student
    });

  } catch (error) {
    console.error('Error in getStudentProfile:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
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
