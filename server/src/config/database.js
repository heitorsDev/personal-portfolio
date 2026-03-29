const { Sequelize } = require("sequelize");
const { Database } = require("libsql");

const sequelize = new Sequelize({
  dialect: "sqlite",
  dialectModule: Database,
  dialectOptions: {
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_DATABASE_TOKEN,
  },
  logging: false,
});

module.exports = sequelize;