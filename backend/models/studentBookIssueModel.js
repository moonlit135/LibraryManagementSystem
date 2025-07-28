module.exports = (sequelize, DataTypes) => {
  const StudentBookIssue = sequelize.define('StudentBookIssue', {
  issue_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  roll_no: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },

  student_name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },

  course: {
    type: DataTypes.ENUM('Btech', 'Mtech', 'MCA', 'MSC', 'BSC'),
    allowNull: false,
  },

  book_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  book_title: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },

  issue_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },

  return_date: {
    type: DataTypes.DATE,
    allowNull: true, // Will be handled in DB as a generated column
  },

  actual_return_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },

  fine: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  }
}, {
  tableName: 'StudentBookIssues',
  timestamps: false,
  });

  return StudentBookIssue;
};
