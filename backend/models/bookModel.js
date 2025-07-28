module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
  bookID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  title: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },

  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },

  author: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },

  image: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },

  upload_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },

  file_path: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },

  category: {
    type: DataTypes.ENUM('Mathematics', 'Computer Science', 'Mechanical', 'Civil', 'Electronics'),
    allowNull: false,
  }

}, {
  tableName: 'Books',
  timestamps: false, // disables Sequelize's createdAt/updatedAt
  });

  return Book;
};
