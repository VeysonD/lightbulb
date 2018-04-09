import Sequelize from 'sequelize';
import readModels from './utils/read-models';

const {
  DB_NAME, DB_PASSWORD, DB_URL, DB_USERNAME,
} = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: DB_URL,
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
});


const db = {};

readModels(db, `${__dirname}/models`, sequelize);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
