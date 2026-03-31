require('dotenv').config();
const { Sequelize } = require("sequelize");

// Local SQLite file
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
  logging: false,
});

module.exports = sequelize;