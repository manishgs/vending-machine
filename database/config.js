require('dotenv').config();

const {
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_USERNAME,
} = process.env;

const config = {
  development: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    dialect: 'postgres',
    logging: console.log,
  },
  test: {
    dialect: "sqlite",
    storage: "./db/db.sqlite3"
  },
  production: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    dialect: 'postgres',
  },
};

module.exports = config;
