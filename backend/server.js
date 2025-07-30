require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const { sequelize, connectDB } = require('./config/db');
const bcrypt = require('bcryptjs');

// Import routes
const authRoutes = require('./routes/authRoutes');
const otpRoutes = require('./routes/otpRoutes');
const studentRoutes = require('./routes/studentRoutes');

// Import models to register them with Sequelize
const { Admin, Student } = require('./models');

const PORT = process.env.PORT || 5000;

// Configure CORS with specific origin and credentials
const corsOptions = {
  origin: 'http://localhost:5173', // Your frontend URL
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/otp', otpRoutes);
app.use('/api/students', studentRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('Library Management System API is running...');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// Function to create default admin user if not exists
const createDefaultAdmin = async () => {
  try {
    const { ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_NAME } = process.env;
    
    if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
      console.warn('Admin email or password not set in .env. Skipping admin creation.');
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
        role: 'Librarian',
        name: ADMIN_NAME || 'Admin'
      });
      
      console.log('Default admin user created successfully');
    } else {
      console.log('Admin user already exists');
    }
  } catch (error) {
    console.error('Error creating default admin user:', error);
  }
};

// First connect to the database, then sync models, then create admin
connectDB()
  .then(() => {
    // Use force: false to prevent dropping and recreating tables
    return sequelize.sync({ force: false });
  })
  .then(() => {
    // Create default admin user
    return createDefaultAdmin();
  })
  .then(() => {
    // Start the server
    const server = app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    });

    // Store the server instance for graceful shutdown
    process.on('SIGTERM', () => {
      console.log('SIGTERM received. Shutting down gracefully');
      server.close(() => {
        console.log('Process terminated');
      });
    });
  })
  .catch(error => {
    console.error('Failed to start server:', error);
    process.exit(1);
  });

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.error(`Error: ${err.message}`);
  // Close server & exit process
  const server = app.listen(0); // Create a dummy server to access close method
  server.close(() => process.exit(1));
});
