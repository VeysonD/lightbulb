import db from './../../../../db/db-config';
import addLog from './../../utils/logger';

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
      const log = `${name} was ${textLog} ${ssid} wifi`;
      const logError = 'There was an error when inserting a new log';
      addLog(log, logError, 'lightId', id, req, res);
    })
    .catch((error) => {
      console.error(error);
      res.send('There was an error when switching the light connection to the wifi');
    });
};

const wifiSwitch = (req, res) => {
  const { id } = req.locals;
  const { wifi } = req.body;
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
              const { name } = light[0][0];
              const log = `${name} switched to ${wifi} wifi`;
              const logError = 'There was an error when inserting a new log';
              addLog(log, logError, 'lightId', id, req, res);
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
