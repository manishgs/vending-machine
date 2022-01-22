import { Options, Sequelize } from 'sequelize';
import {
  APP_ENV, DB_HOST, DB_NAME, DB_PASSWORD, DB_USERNAME,
} from '../config';

let options: Options;

if (APP_ENV === 'test') {
  options = {
    dialect: 'sqlite',
    storage: './db/db.sqlite3',
  };
} else {
  options = {
    host: DB_HOST,
    database: DB_NAME,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    dialect: 'postgres',
    logging: false,
  };
}

const sequelize = new Sequelize(process.env.DATABASE_URL || '', options);

export default sequelize;
