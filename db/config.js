import Sequelize from 'sequelize';
import readModels from './utils/read-models';

const sequelize = new Sequelize('mydevices', process.env.DB_USERNAME || 'postgres', process.env.DB_PASSWORD || 'root', {
  host: process.env.DB_URL || 'localhost',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
});

const db = {};

readModels(db, `${__dirname}/models/lights`, sequelize);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
