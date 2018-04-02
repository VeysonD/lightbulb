import express from 'express';
import bcrypt from 'bcrypt'; // MOVE TO AUTH

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
  db.sequelize
    .query(`SELECT connected_wifi, wifi_id, wifi_pass FROM lights WHERE id = ${id}`)
    .then((connectionStatus) => {
      console.log('What is the connectionStatus: ', connectionStatus);
      const connect = connectionStatus[0];
      if (connect.length === 0) {
        res.send('This light is not associated with any wifi');
      } else {
        const connectedWifi = connect[0].connected_wifi;
        const wifiId = connect[0].wifi_id;
        const wifiPass = connect[0].wifi_pass;
        if (connectedWifi) { // it is connected to a wifi
          req.locals = { id };
          next();
        } else if (!wifiId) {
          res.send('This light is not associated with a wifi');
        } else {
          db.sequelize
            .query(`SELECT password FROM wifis where id=${wifiId}`)
            .then((passResult) => {
              const wifiTruePass = passResult[0][0].password;
              console.log('PASSWORDS: ', wifiTruePass, wifiPass);
              if (wifiTruePass === wifiPass) {
                db.light
                  .update({
                    connected_wifi: true,
                  }, {
                    where: {
                      id,
                    },
                  })
                  .then((connectionUpdate) => {
                    console.log('What is the connection update: ', connectionUpdate);
                    req.locals = { id };
                    next();
                  })
                  .catch((error) => {
                    console.error(error);
                    res.send('There was an error while updating the connection');
                  });
              } else {
                res.send('Light password for wifi is incorrect');
              }
            })
            .catch((error) => {
              console.error(error);
              res.send('There was an error while retrieving the wifi password');
            });
        }
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
