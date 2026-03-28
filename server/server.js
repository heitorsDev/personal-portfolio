require('dotenv').config();

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const sequelize = require('./src/config/database');

const indexRoutes = require('./src/routes/index');
const authRoutes = require('./src/routes/auth');
const projectRoutes = require('./src/routes/project');

const app = express();
const PORT = process.env.PORT || 3000;

// Normalize CLIENT_URL to remove trailing slash for CORS matching
const rawClientUrl = process.env.CLIENT_URL || 'http://localhost:3000';
const clientUrl = rawClientUrl.replace(/\/$/, '');

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    
    // Normalize the incoming origin
    const normalizedOrigin = origin.replace(/\/$/, '');
    const allowedOrigin = clientUrl.replace(/\/$/, '');
    
    if (normalizedOrigin === allowedOrigin || origin === allowedOrigin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api', indexRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);


app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ message: 'Internal server error' });
});

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully.');

    await sequelize.sync({ alter: true });
    console.log('Database synchronized.');

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error('Unable to start server:', error);
    process.exit(1);
  }
};

startServer();
