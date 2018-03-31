import express from 'express';
import db from './../../../db/db-config';

const lightRouter = express.Router();

lightRouter.get('/all', (req, res) => {
  db.light
    .findAll()
    .then((lights) => {
      res.send(lights);
    });
});

lightRouter.get('/:id', (req, res) => {
  const { id } = req.params;
  db.sequelize
    .query(`SELECT * FROM lights WHERE id = ${id}`)
    .then((light) => {
      res.send(light[0]);
    })
    .catch((error) => {
      console.error(error);
      res.send('There was an error with the database');
    });
});


lightRouter.post('/:id/on', (req, res) => {
  const { id } = req.params;
  db.sequelize
    .query(`UPDATE lights SET on = NOT on WHERE id = ${id}`)
    .spread((light, metadata) => {
      res.send(`Light id ${light} and ${metadata}`);
    });
});

export default lightRouter;
