

const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,     
  process.env.DB_USER,    
  process.env.DB_PASSWORD, 
  {
    host: process.env.DB_HOST,  
    dialect: 'mysql',
    logging: false,             // Set to true if i want SQL logs
  }
);

// Test connection
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('MySQL Database connected successfully via Sequelize.');
  } catch (error) {
    console.error('Unable to connect to the database:', error.message);
  }
};

module.exports = { sequelize, connectDB };
