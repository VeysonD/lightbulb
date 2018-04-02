import express from 'express';

import db from './../../../db/db-config';
import { handleAuth } from './auth/light-auth-settings';
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

lightRouter.post('/:id/*', (req, res, next) => {
  const { id } = req.params;
  const { wifi } = req.body;
  db.sequelize
    .query(`SELECT connected_wifi FROM lights WHERE id = ${id}`)
    .then((connectionStatus) => {
      if (connectionStatus[0].length === 0) {
        res.send('This light is not associated with any wifi');
      } else if (!connectionStatus[0][0].connected_wifi) { // not connected
        req.locals = { id, wifi };
        // if it isn't connected to wifi
        // check if the wifi is given from line 30;
          // if it isn't then res.send and error out res.send(please provide wifi to connect to)
          //if it is then check if the wifi corresponds to a wifi in the DB
            // if the wifi is in the database then update the wifi_id and update connected_wifi to true
              // update changelog to show that light connceted to wifi_id
                //next() (??? or res.send???)
            // if the wifi isn't in the database then res.send and error out res.send(please use a valid wifi)
        next();
      } else { // connected
        req.locals = { id, wifi }; // maybe don't need to send wifi
        next();
      }
    })
    .catch((error) => {
      console.error(error);
      res.send('There was an error when checking the lights');
    });
});

// lightRouter.post('/:id/*', handleAuth);

lightRouter.post('/:id/color', changeColor);
lightRouter.post('/:id/switch', changeSwitch);

lightRouter.post('/:id/wifi-off', wifiOff);
lightRouter.post('/:id/wifi-switch', wifiSwitch);

lightRouter.delete('/:id/delete', deleteLight);

export default lightRouter;
