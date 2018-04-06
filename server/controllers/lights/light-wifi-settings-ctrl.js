import db from './../../../db/db-config';
import { comparePass } from './../../utils/password-check';
import addLog from './../../utils/logger';

const wifiPassCtrl = (password, id) =>
  new Promise((resolve, reject) => {
    db.light
      .update({
        connected_wifi: false,
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
        resolve();
      })
      .catch((error) => {
        console.error(error);
        reject(new Error('There was an error when updating the password'));
      });
  });

const wifiUpdate = (wifi, password, id) =>
  new Promise((resolve, reject) => {
    db.sequelize
      .query(`UPDATE lights SET wifi_id=(SELECT id FROM wifis WHERE ssid='${wifi}'), wifi_pass='${password}' WHERE id=${id} RETURNING name`)
      .then((light) => {
        const { name } = light[0][0];
        const log = `${name} switched to ${wifi} wifi`;
        addLog(log, 'lightId', id);
        resolve();
      })
      .catch((error) => {
        console.error(error);
        reject(new Error('There was an error when updating the light wifi settings'));
      });
  });

const wifiChangeCtrl = (wifi, password, id) =>
  new Promise((resolve, reject) => {
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
                  .then(() => {
                    resolve();
                  })
                  .catch((error) => {
                    console.error(error);
                    reject(error);
                  });
              } else {
                reject(new Error('Password is invalid for the specified wifi'));
              }
            })
            .catch((error) => {
              console.error(error);
              reject(new Error(`There was an error while checking the password ${error}`));
            });
        }
      })
      .catch((error) => {
        console.error(error);
        reject(new Error('There was an error when updating the wifi'));
      });
  });

const wifiToggleOffCtrl = id =>
  new Promise((resolve, reject) => {
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
        addLog(log, 'lightId', id);
        resolve();
      })
      .catch((error) => {
        console.error(error);
        reject(new Error('There was an error when switchig the light connection to the wifi'));
      });
  });

export { wifiChangeCtrl, wifiPassCtrl, wifiToggleOffCtrl };
