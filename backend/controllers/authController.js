const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Admin, Professor, Student } = require('../models'); // Sequelize models
require('dotenv').config();

const generateToken = (userId, role) => {
  return jwt.sign({ id: userId, role }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

// Register
exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    let user;

    switch (role) {
      case 'admin':
        user = await Admin.create({ name, email, password: hashedPassword });
        break;
      case 'professor':
        user = await Professor.create({ name, email, password: hashedPassword });
        break;
      case 'student':
        user = await Student.create({ name, email, password: hashedPassword });
        break;
      default:
        return res.status(400).json({ message: 'Invalid role' });
    }

    const token = generateToken(user.id, role);
    res.status(201).json({ message: `${role} registered`, token });
  } catch (error) {
    console.error('Register Error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

// Login 
exports.login = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    let user;

    switch (role) {
      case 'admin':
        user = await Admin.findOne({ where: { email } });
        break;
      case 'professor':
        user = await Professor.findOne({ where: { email } });
        break;
      case 'student':
        user = await Student.findOne({ where: { email } });
        break;
      default:
        return res.status(400).json({ message: 'Invalid role' });
    }

    if (!user) {
      return res.status(404).json({ message: `${role} not found` });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = generateToken(user.id, role);
    res.status(200).json({ message: `${role} logged in`, token });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};
