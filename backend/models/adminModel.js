module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define('Admin', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  username: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },

  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },

  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },

  role: {
    type: DataTypes.ENUM('Librarian', 'Moderator'),
    allowNull: false,
    defaultValue: 'Librarian',
  },

  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'Admins',
  timestamps: false, // disables createdAt/updatedAt
  });

  return Admin;
};