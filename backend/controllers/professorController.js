const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Professor } = require('../models');

// Create a new professor
exports.registerProfessor = async (req, res) => {
  try {
    const { name, department, employment_id, password, email } = req.body;

    const existingProfessor = await Professor.findOne({ where: { employment_id } });
    if (existingProfessor) {
      return res.status(400).json({ message: 'Professor with this ID already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const professor = await Professor.create({
      name,
      department,
      employment_id,
      password: hashedPassword,
      email
    });

    res.status(201).json({ message: 'Professor registered successfully', professor });
  } catch (error) {
    console.error('Register Professor Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Professor Login
exports.loginProfessor = async (req, res) => {
  try {
    const { employment_id, password } = req.body;

    const professor = await Professor.findOne({ where: { employment_id } });

    if (!professor) {
      return res.status(404).json({ message: 'Professor not found' });
    }

    const isMatch = await bcrypt.compare(password, professor.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: professor.id, role: 'professor' }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    });

    res.json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Professor Login Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Get all professors
exports.getAllProfessors = async (req, res) => {
  try {
    const professors = await Professor.findAll();
    res.json(professors);
  } catch (error) {
    console.error('Get Professors Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Get professor by ID
exports.getProfessorById = async (req, res) => {
  try {
    const { id } = req.params;
    const professor = await Professor.findByPk(id);

    if (!professor) {
      return res.status(404).json({ message: 'Professor not found' });
    }

    res.json(professor);
  } catch (error) {
    console.error('Get Professor by ID Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Update professor
exports.updateProfessor = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, department, email } = req.body;

    const professor = await Professor.findByPk(id);
    if (!professor) {
      return res.status(404).json({ message: 'Professor not found' });
    }

    await professor.update({ name, department, email });

    res.json({ message: 'Professor updated successfully', professor });
  } catch (error) {
    console.error('Update Professor Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Delete professor
exports.deleteProfessor = async (req, res) => {
  try {
    const { id } = req.params;

    const professor = await Professor.findByPk(id);
    if (!professor) {
      return res.status(404).json({ message: 'Professor not found' });
    }

    await professor.destroy();
    res.json({ message: 'Professor deleted successfully' });
  } catch (error) {
    console.error('Delete Professor Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
