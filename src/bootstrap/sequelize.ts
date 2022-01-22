import { Options, Sequelize } from 'sequelize';

const options: Options = {
  dialect: 'sqlite',
  storage: './db/db.sqlite3',
};

const sequelize = new Sequelize(options);

export default sequelize;
