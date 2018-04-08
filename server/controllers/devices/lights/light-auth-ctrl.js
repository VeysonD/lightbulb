import db from './../../../../db/db-config';
import { comparePass } from './../../../utils/password-check';
import addLog from './../../changelogs/changelog-ctrl';

const connectionUpdate = (id, lightName, wifiId, wifiPass) =>
  new Promise((resolve, reject) => {
    db.sequelize
      .query(`SELECT password, ssid FROM wifis where id=${wifiId}`)
      .then((passResult) => {
        const wifiTruePass = passResult[0][0].password;
        const wifiName = passResult[0][0].ssid;

        comparePass(wifiPass, wifiTruePass)
          .then((check) => {
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
                  const log = `${lightName} was connected to ${wifiName} wifi`;

                  addLog(log, 'lightId', id);
                  resolve(log);
                })
                .catch((error) => {
                  reject(error);
                });
            } else {
              reject(new Error('Light password for wifi is incorrect'));
            }
          })
          .catch((error) => {
            reject(error);
          });
      })
      .catch((error) => {
        reject(error);
      });
  });

const handleAuthCtrl = (id, password) =>
  new Promise((resolve, reject) => {
    db.sequelize
      .query(`SELECT connected_wifi, name, "wifiId", wifi_pass FROM lights WHERE id = ${id}`)
      .then((connectionStatus) => {
        const connect = connectionStatus[0];

        if (connect.length === 0) {
          reject(new Error('This light is not associated with any wifi'));
        } else {
          const connectedWifi = connect[0].connected_wifi;
          const lightName = connect[0].name;
          const { wifiId } = connect[0];
          const wifiPass = password || connect[0].wifi_pass;

          if (connectedWifi) {
            resolve('Light is connected');
          } else if (!wifiId) {
            reject(new Error('This light is not associated with any wifi'));
          } else {
            connectionUpdate(id, lightName, wifiId, wifiPass)
              .then((log) => {
                resolve(log);
              })
              .catch((error) => {
                reject(error);
              });
          }
        }
      })
      .catch((error) => {
        reject(error);
      });
  });

export default handleAuthCtrl;
