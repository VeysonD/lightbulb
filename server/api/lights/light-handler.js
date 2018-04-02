import express from 'express';
import bcrypt from 'bcrypt'; // MOVE TO AUTH

import db from './../../../db/db-config';
import handleAuth from './auth/light-auth-settings';
import { changeColor, changeSwitch, deleteLight } from './settings/light-settings';
import { wifiOff, wifiSwitch } from './wifi-settings/light-wifi-settings';

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

lightRouter.post('/:id/*', handleAuth);

lightRouter.post('/:id/color', changeColor);
lightRouter.post('/:id/switch', changeSwitch);

lightRouter.post('/:id/wifi-off', wifiOff);
lightRouter.post('/:id/wifi-switch', wifiSwitch);

lightRouter.delete('/:id/delete', deleteLight);

export default lightRouter;
