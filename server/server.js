require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const sequelize = require('./src/config/database');

const indexRoutes = require('./src/routes/index');
const authRoutes = require('./src/routes/auth');
const projectRoutes = require('./src/routes/project');

const app = express();
const PORT = process.env.PORT || 3000;

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
