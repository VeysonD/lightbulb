import db from './../../../../db/db-config';
import { comparePass } from './../../../utils/password-check';
import addLog from './../../changelogs/changelog-ctrl';

const checkWifiConnection = (password, id) =>
  new Promise((resolve, reject) => {
    db.sequelize
      .query(`SELECT password FROM wifis INNER JOIN lights ON lights."wifiId"=wifis.id WHERE lights.id=${id}`)
      .then((results) => {
        const wifiHash = results[0][0].password;

        comparePass(password, wifiHash)
          .then((check) => {
            resolve(check);
          })
          .catch((error) => {
            reject(error);
          });
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });

const wifiPassCtrl = (password, id) =>
  new Promise((resolve, reject) => {
    if (password) {
      checkWifiConnection(password, id)
        .then((result) => {
          const connected = result;
          db.light
            .update({
              connected_wifi: connected,
              wifi_pass: password,
            }, {
              where: {
                id,
              },
              returning: true,
            })
            .then((light) => {
              const { name } = light[1][0].dataValues;
              const log = `${name}'s saved wifi password was changed to ${password}`;

              addLog(log, 'lightId', id);
              resolve(log);
            })
            .catch((error) => {
              reject(error);
            });
        })
        .catch((error) => {
          reject(error);
        });
    } else {
      reject(new Error('An invalid password was provided'));
    }
  });

const wifiUpdate = (wifi, password, id) =>
  new Promise((resolve, reject) => {
    db.sequelize
      .query(`UPDATE lights SET "wifiId"=(SELECT id FROM wifis WHERE ssid='${wifi}'), wifi_pass='${password}' WHERE id=${id} RETURNING name, (SELECT id FROM wifis INNER JOIN lights ON lights."wifiId"=wifis.id WHERE lights.id=${id})`)
      .then((light) => {
        const { name } = light[0][0];
        const { wifiId } = light[0][0].id;
        const log = `${name} switched to ${wifi} wifi`;

        addLog(log, 'lightId', id);
        addLog(log, 'wifiId', wifiId);
        resolve(log);
      })
      .catch((error) => {
        reject(error);
      });
  });

const wifiChangeCtrl = (wifi, password, id) =>
  new Promise((resolve, reject) => {
    if (wifi && password) {
      db.wifi
        .findAll({
          attributes: [
            'ssid',
            'password',
          ],
          where: {
            ssid: wifi,
          },
        })
        .then((data) => {
          if (data.length === 0) {
            reject(new Error('The wifi does not exist on the system'));
          } else {
            const wifiHash = data[0].dataValues.password;
            comparePass(password, wifiHash)
              .then((check) => {
                if (check) {
                  wifiUpdate(wifi, password, id)
                    .then((log) => {
                      resolve(log);
                    })
                    .catch((error) => {
                      reject(error);
                    });
                } else {
                  reject(new Error('Password is invalid for the specified wifi'));
                }
              })
              .catch((error) => {
                reject(error);
              });
          }
        })
        .catch((error) => {
          reject(error);
        });
    } else {
      reject(new Error('Please provide a wifi and password'));
    }
  });

const wifiToggleOffCtrl = id =>
  new Promise((resolve, reject) => {
    db.sequelize
      .query(`UPDATE lights SET connected_wifi = NOT connected_wifi WHERE id = ${id} RETURNING name, connected_wifi, (SELECT ssid FROM wifis INNER JOIN lights ON lights."wifiId"=wifis.id WHERE lights.id=${id})`)
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

        addLog(log, 'lightId', id);
        resolve(log);
      })
      .catch((error) => {
        reject(error);
      });
  });

export { wifiChangeCtrl, wifiPassCtrl, wifiToggleOffCtrl };
