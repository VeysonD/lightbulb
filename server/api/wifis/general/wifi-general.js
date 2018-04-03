import db from './../../../../db/db-config';

const retrieveAll = (req, res) => {
  db.wifi
    .findAll()
    .then((wifis) => {
      res.send(wifis);
    });
};

const retrieveOne = (req, res) => {
  const { id } = req.params;
  db.sequelize
    .query(`SELECT * FROM wifis WHERE id=${id}`)
    .then((wifi) => {
      res.send(wifi[0]);
    })
    .catch((error) => {
      console.error(error);
      res.send('There was an error with your wifi request');
    });
};

export { retrieveAll, retrieveOne };
