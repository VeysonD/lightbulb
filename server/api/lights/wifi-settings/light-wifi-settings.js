import bcrypt from 'bcrypt';

import db from './../../../../db/db-config';
import addLog from './../../utils/logger';


const wifiChange = (req, res) => {
  const { id } = req.locals;
  const { wifi, password } = req.body;
  if (wifi && password) {
    db.sequelize
      .query(`SELECT ssid, password from wifis WHERE ssid='${wifi}'`)
      .then((ssid) => {
        if (ssid[0].length === 0) {
          res.send('The wifi does not exist on the system');
        } else {
          bcrypt.compare(password, ssid[0][0].password, (err, check) => {
            if (check) {
              db.sequelize
                .query(`UPDATE lights SET wifi_id=(SELECT id FROM wifis where ssid='${wifi}'), wifi_pass='${ssid[0][0].password}' WHERE id=${id} RETURNING name`)
                .then((light) => {
                  const { name } = light[0][0];
                  const log = `${name} switched to ${wifi} wifi`;
                  addLog(log, 'lightId', id, req, res);
                })
                .catch((error) => {
                  console.error(error);
                  res.send('There was an error when updating the wifi');
                });
            } else {
              res.send('Password is invalid for the specified wifi');
            }
          });
        }
      })
      .catch((error) => {
        console.error(error);
        res.send('There was an error when trying to find the wifi');
      });
  } else {
    res.send('An invalid wifi or password was provided');
  }
};

const wifiPass = (req, res) => {
  const { id } = req.locals;
  const { password } = req.body;

  if (password) {
    bcrypt.hash(password, 10, (err, hash) => {
      db.light
        .update({
          wifi_pass: hash,
        }, {
          where: {
            id,
          },
          returning: true,
        })
        .then((light) => {
          const { name } = light[1][0].datavalues;
          const log = `${name}'s saved wifi password was changed`;
          addLog(log, 'lightId', id, req, res);
        })
        .catch((error) => {
          console.error(error);
          res.send('There was an error when updating the password');
        });
    });
  } else {
    res.send('An invalid wifi or password was provided');
  }
};

const wifiSwitch = (req, res) => {
  const { id } = req.locals;
  db.sequelize
    .query(`UPDATE lights SET connected_wifi = NOT connected_wifi WHERE id = ${id} RETURNING name, connected_wifi, (SELECT ssid FROM wifis INNER JOIN lights ON lights.wifi_id=wifis.id)`)
    .spread((light) => {
      const { name, ssid } = light[0];
      const connectedWifi = light[0].connected_wifi;
      let textLog = '';
      if (connectedWifi) {
        textLog = 'connected to';
      } else {
        textLog = 'disconnected from';
      }
      const log = `${name} was ${textLog} ${ssid} wifi`;
      addLog(log, 'lightId', id, req, res);
    })
    .catch((error) => {
      console.error(error);
      res.send('There was an error when switching the light connection to the wifi');
    });
};

export { wifiChange, wifiPass, wifiSwitch };
