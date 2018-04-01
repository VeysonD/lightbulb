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

lightRouter.post('/:id/*', (req, res, next) => {
  const { id } = req.params;
  db.sequelize
    .query(`SELECT connected_wifi FROM lights WHERE id = ${id}`)
    .then((connectionStatus) => {
      if (connectionStatus[0].length === 0 || !connectionStatus[0][0].connected_wifi) {
        res.send('This light is not connected to the wifi');
      } else {
        req.locals = { id };
        next();
      }
    })
    .catch((error) => {
      console.error(error);
      res.send('There was an error when checking the lights');
    });
});

lightRouter.post('/:id/color', (req, res) => {
  const { id } = req.locals;
  const { color } = req.body;
  db.light
    .update({
      color,
    }, {
      where: {
        id,
      },
      returning: true,
    })
    .then((light) => {
      if (light[1].length === 0) {
        res.send('That light does not exist');
      } else {
        const { name } = light[1][0].dataValues;
        db.changelog
          .create({
            log: `${name}'s color changed to ${color}`,
            lightId: id,
          })
          .then((changelog) => {
            res.send(changelog);
          })
          .catch((error) => {
            console.error(error);
            res.send('There was an error when inserting a new log');
          });
      }
    })
    .catch((error) => {
      console.error(error);
      res.send('There was an error when updating the color');
    });
});


lightRouter.post('/:id/switch', (req, res) => {
  const { id } = req.locals;
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
      res.send('There was an error when switching the light');
    });
});

export default lightRouter;
