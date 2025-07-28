const { sequelize } = require('../config/db');
const { DataTypes } = require('sequelize');

// Initialize models
const Admin = require('./adminModel')(sequelize, DataTypes);
const Book = require('./bookModel')(sequelize, DataTypes);
const Professor = require('./professorModel')(sequelize, DataTypes);
const Student = require('./studentModel')(sequelize, DataTypes);
const StudentBookIssue = require('./studentBookIssueModel')(sequelize, DataTypes);
const ProfessorBookIssue = require('./professorBookIssueModel')(sequelize, DataTypes);

// Define associations
// StudentBookIssue → Book & Student
StudentBookIssue.belongsTo(Book, { foreignKey: 'book_id' });
StudentBookIssue.belongsTo(Student, { foreignKey: 'roll_no', targetKey: 'roll_no' });

// ProfessorBookIssue → Book & Professor
ProfessorBookIssue.belongsTo(Book, { foreignKey: 'book_id' });
ProfessorBookIssue.belongsTo(Professor, { foreignKey: 'professor_id' });

// Exporting models and sequelize instance
module.exports = {
  sequelize,
  Admin,
  Book,
  Professor,
  Student,
  StudentBookIssue,
  ProfessorBookIssue
};
