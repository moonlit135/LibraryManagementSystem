module.exports = (sequelize, DataTypes) => {
  const ProfessorBookIssue = sequelize.define('ProfessorBookIssue', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  employment_id: {
    type: DataTypes.STRING(50),
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

  professor_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },

  issue_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },

  return_date: {
    type: DataTypes.DATE,
    allowNull: true, // trigger will set this in the DB
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
  tableName: 'ProfessorBookIssues',
  timestamps: false,
  });

  return ProfessorBookIssue;
};

