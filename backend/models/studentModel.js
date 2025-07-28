module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define('Student', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },

  name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },

  department: {
    type: DataTypes.ENUM('CSE', 'Civil', 'Mathematics', 'Electronics'),
    allowNull: false
  },

  course: {
    type: DataTypes.ENUM('Btech', 'Mtech', 'MCA', 'MSC', 'BSC'),
    allowNull: false
  },

  roll_no: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },

  password: {
    type: DataTypes.STRING(255),
    allowNull: false
  },

  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true
  }
}, {
  tableName: 'Students',
  timestamps: false
  });

  return Student;
};

