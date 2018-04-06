import bcrypt from 'bcrypt';

import db from './../../../../db/db-config';
import addLog from './../../../utils/logger';


const handleAuth = (req, res, next) => {
  const { id } = req.params;
  const { password } = req.body;
  db.sequelize
    .query(`SELECT connected_wifi, name, wifi_id, wifi_pass FROM lights WHERE id = ${id}`)
    .then((connectionStatus) => {
      const connect = connectionStatus[0];
      if (connect.length === 0) {
        res.send('This light is not associated with any wifi');
      } else {
        const connectedWifi = connect[0].connected_wifi;
        const lightName = connect[0].name;
        const wifiId = connect[0].wifi_id;
        const wifiPass = password || connect[0].wifi_pass;
        if (connectedWifi) {
          req.locals = { id };
          next();
        } else if (!wifiId) {
          res.send('This light is not associated with a wifi');
        } else {
          db.sequelize
            .query(`SELECT password, ssid FROM wifis where id=${wifiId}`)
            .then((passResult) => {
              const wifiTruePass = passResult[0][0].password;
              const wifiName = passResult[0][0].ssid;
              bcrypt.compare(wifiPass, wifiTruePass, (err, check) => {
                if (check) {
                  db.light
                    .update({
                      connected_wifi: true,
                    }, {
                      where: {
                        id,
                      },
                    })
                    .then(() => {
                      req.locals = { id };
                      const log = `${lightName} was connected to ${wifiName} wifi`;
                      addLog(log, 'lightId', id);
                      next();
                    })
                    .catch((error) => {
                      console.error(error);
                      res.send('There was an error while updating the connection');
                    });
                } else {
                  res.send('Light password for wifi is incorrect');
                }
              });
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
};


export default handleAuth;
