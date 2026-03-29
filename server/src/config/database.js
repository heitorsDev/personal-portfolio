require('dotenv').config();
const { Sequelize } = require("sequelize");

// Validate Turso credentials are set
if (!process.env.TURSO_DATABASE_URL || !process.env.TURSO_DATABASE_TOKEN) {
  console.error('ERROR: TURSO_DATABASE_URL and TURSO_DATABASE_TOKEN must be set');
  console.error('TURSO_DATABASE_URL:', process.env.TURSO_DATABASE_URL || 'NOT SET');
  console.error('TURSO_DATABASE_TOKEN:', process.env.TURSO_DATABASE_TOKEN ? 'SET (hidden)' : 'NOT SET');
  process.exit(1);
}

const { createClient } = require("@libsql/client");

// Create libsql client for remote Turso connection
const client = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_DATABASE_TOKEN,
});

// Create Sequelize instance using sqlite dialect with remote connection
const sequelize = new Sequelize({
  dialect: "sqlite",
  dialectModulePath: "@libsql/sqlite3",
  storage: process.env.TURSO_DATABASE_URL,
  dialectOptions: {
    authToken: process.env.TURSO_DATABASE_TOKEN,
  },
  logging: false,
});

// Override connection to use libsql client directly
const originalQuery = sequelize.query.bind(sequelize);
sequelize.query = async function(sql, options) {
  if (typeof sql === 'object') sql = sql.query;
  const result = await client.execute(sql);
  return [result.rows, result];
};

module.exports = sequelize;