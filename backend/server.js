require('dotenv').config();
const app = require('./app');
const { sequelize, connectDB } = require('./config/db');
const bcrypt = require('bcryptjs');

// Import models to register them with Sequelize
const { Admin } = require('./models');

const PORT = process.env.PORT || 5000;

// Function to create default admin user if not exists
const createDefaultAdmin = async () => {
  try {
    const { ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_NAME } = process.env;
    
    if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
      console.warn(' Admin email or password not set in .env. Skipping admin creation.');
      return;
    }

    const existingAdmin = await Admin.findOne({ where: { email: ADMIN_EMAIL } });
    
    if (!existingAdmin) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, salt);
      
      // Create a username from the email (everything before @)
      const username = ADMIN_EMAIL.split('@')[0];
      
      await Admin.create({
        username: username,
        email: ADMIN_EMAIL,
        password: hashedPassword,
        role: 'Librarian',  // Using 'Librarian' as the default role
        name: ADMIN_NAME || 'Admin'  // Keeping name as an optional field
      });
      
      console.log(' Default admin user created successfully');
    } else {
      console.log(' Admin user already exists');
    }
  } catch (error) {
    console.error('Error creating default admin user:', error);
  }
};

// First connect to the database, then sync models, then create admin
connectDB()
  .then(() => {
    // Use force: false to prevent dropping and recreating tables
    // and alter: false to prevent automatic schema changes
    return sequelize.sync({ force: false, alter: false });
  })
  .then(() => {
    console.log(' Database connected and models synced.');
    return createDefaultAdmin();
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(` Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(' Failed to start server:', err);
    process.exit(1);
  });
