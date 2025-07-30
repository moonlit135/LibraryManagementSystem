const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Admin, Professor, Student } = require('../models');
require('dotenv').config();

const generateToken = (userId, role) => {
  // Ensure role starts with capital letter for consistency
  const formattedRole = role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
  return jwt.sign({ id: userId, role: formattedRole }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

// Admin Auth
const registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = await Admin.create({ name, email, password: hashedPassword });
    const token = generateToken(admin.id, 'Admin'); // Explicitly using 'Admin' with capital A
    res.status(201).json({ message: 'Admin registered successfully', token });
  } catch (error) {
    console.error('Admin Register Error:', error);
    res.status(500).json({ message: 'Error registering admin', error: error.message });
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ where: { email } });
    
    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const token = generateToken(admin.id, 'Admin'); // Explicitly using 'Admin' with capital A
    res.json({ message: 'Admin login successful', token });
  } catch (error) {
    console.error('Admin Login Error:', error);
    res.status(500).json({ message: 'Error logging in admin', error: error.message });
  }
};

// Professor Auth
const registerProfessor = async (req, res) => {
  try {
    const { name, email, password, department } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const professor = await Professor.create({ 
      name, 
      email, 
      password: hashedPassword, 
      department 
    });
    const token = generateToken(professor.id, 'Professor'); 
    res.status(201).json({ message: 'Professor registered successfully', token });
  } catch (error) {
    console.error('Professor Register Error:', error);
    res.status(500).json({ message: 'Error registering professor', error: error.message });
  }
};

const loginProfessor = async (req, res) => {
  try {
    const { email, password } = req.body;
    const professor = await Professor.findOne({ where: { email } });
    
    if (!professor || !(await bcrypt.compare(password, professor.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const token = generateToken(professor.id, 'Professor'); 
    res.json({ message: 'Professor login successful', token });
  } catch (error) {
    console.error('Professor Login Error:', error);
    res.status(500).json({ message: 'Error logging in professor', error: error.message });
  }
};

// Student Auth
const registerStudent = async (req, res) => {
  try {
    const { name, email, password, roll_no, department, course } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const student = await Student.create({
      name,
      email,
      password: hashedPassword,
      roll_no,
      department,
      course,
      otp: null,
      otpExpiry: null,
      isEmailVerified: false
    });
    
    // For now, we'll just return success. The actual OTP flow will be handled by the OTP controller
    res.status(201).json({ 
      success: true,
      message: 'Student registration initiated. Please verify your email.',
      studentId: student.id
    });
  } catch (error) {
    console.error('Student Register Error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error registering student',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

const loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;
    const student = await Student.findOne({ where: { email } });
    
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }
    
    if (!(await bcrypt.compare(password, student.password))) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    
    if (!student.isEmailVerified) {
      return res.status(403).json({ 
        success: false, 
        message: 'Please verify your email before logging in' 
      });
    }
    
    const token = generateToken(student.id, 'Student'); 
    res.json({ 
      success: true,
      message: 'Student login successful', 
      token,
      user: {
        id: student.id,
        name: student.name,
        email: student.email,
        role: 'Student'
      }
    });
  } catch (error) {
    console.error('Student Login Error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error logging in student',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Export all the methods
module.exports = {
  // Admin
  registerAdmin,
  loginAdmin,
  
  // Professor
  registerProfessor,
  loginProfessor,
  
  // Student
  registerStudent,
  loginStudent
};
