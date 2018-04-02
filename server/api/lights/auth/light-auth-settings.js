import bcrypt from 'bcrypt';
import db from './../../../../db/db-config';


const handleAuth = (req, res, next) => {
  const { id } = req.params;
  db.sequelize
    .query(`SELECT connected_wifi, wifi_id, wifi_pass FROM lights WHERE id = ${id}`)
    .then((connectionStatus) => {
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
