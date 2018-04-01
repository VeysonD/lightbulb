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
      res.send('There was an error with your request');
    });
});


lightRouter.post('/:id/switch', (req, res) => {
  const { id } = req.params;
  db.sequelize
    .query(`UPDATE lights SET switched_on = NOT switched_on WHERE id = ${id} RETURNING name, switched_on`)
    .spread((light) => {
      const { name } = light[0];
      const on = light[0].switched_on;
      let onText = '';
      if (on) {
        onText = 'on';
      } else {
        onText = 'off';
      }
      db.changelog
        .create({
          log: `${name} was switched ${onText}`,
          lightId: id,
        })
        .then((changelog) => {
          res.send(changelog);
        })
        .catch((error) => {
          console.error(error);
          res.send('There was an error when inserting a new log');
        });
    })
    .catch((error) => {
      console.error(error);
      res.send('There was an error with your request');
    });
});

export default lightRouter;
