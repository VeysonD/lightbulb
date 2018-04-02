import db from './../../../../db/db-config';

const wifiOff = (req, res) => {
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
      db.changelog
        .create({
          log: `${name} was ${textLog} ${ssid} wifi`,
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
      res.send('There was an error when switching the light connection to the wifi');
    });
};

const wifiSwitch = (req, res) => {
  const { id, wifi } = req.locals;
  if (wifi) {
    db.sequelize
      .query(`SELECT ssid from wifis WHERE ssid='${wifi}'`)
      .then((ssid) => {
        if (ssid[0].length === 0) {
          res.send('The wifi does not exist on the system');
        } else {
          db.sequelize
            .query(`UPDATE lights SET wifi_id=(SELECT id FROM wifis where ssid='${wifi}') WHERE id=${id} RETURNING name`)
            .then((light) => {
              console.log('WHAT IS THE LIGHT: ', light);
              const { name } = light[0][0];
              db.changelog
                .create({
                  log: `${name} switched to ${wifi} wifi`,
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
              res.send('There was an error when updating the wifi');
            });
        }
      })
      .catch((error) => {
        console.error(error);
        res.send('There was an error when trying to find the wifi');
      });
  } else {
    res.send('An invalid wifi was provided');
  }
};

export { wifiOff, wifiSwitch };
