const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Project = sequelize.define('Project', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  imageLink: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  mainLink: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  githubLink: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  youtubeLink: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  onshapeLink: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
}, {
  tableName: 'projects',
});

module.exports = Project;
