import Sequelize from 'sequelize';
import readModels from './utils/read-models';


const sequelize = new Sequelize('mydevices', process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_URL,
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
