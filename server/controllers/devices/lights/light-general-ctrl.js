import db from './../../../../db/db-config';
import { comparePass } from './../../../utils/password-check';
import addLog from './../../changelogs/changelog-ctrl';


const createNewLight = (
  charging = true, color,
  dim = 0, ip,
  latitude, longitude, location,
  name, switchedOn,
  wifi, wifiId, wifiPass,
) =>
  new Promise((resolve, reject) => {
    const connectedWifi = true;
    db.light
      .create({
        charging,
        color,
        dim,
        ip,
        latitude,
        longitude,
        location,
        name,
        switched_on: switchedOn,
        connected_wifi: connectedWifi,
        wifiId,
        wifi_pass: wifiPass,
      })
      .then(() => {
        const log = `${name} was added to ${wifi}'s light network`;

        addLog(log, 'wifiId', wifiId);
        resolve(log);
      })
      .catch((error) => {
        error.code = 400;
        reject(error);
      });
  });

const newLightCtrl = (
  charging, color,
  dim, ip,
  latitude, longitude, location,
  name, switchedOn,
  wifi, wifiPass,
) =>
  new Promise((resolve, reject) => {
    db.wifi
      .findAll({
        attributes: [
          'id',
          'password',
        ],
        where: {
          ssid: wifi,
        },
      })
      .then((data) => {
        if (data.length === 0) {
          const error = new Error('There is no wifi by that name');
          error.code = 404;
          reject(error);
        } else {
          const wifiHash = data[0].dataValues.password;
          const wifiId = data[0].dataValues.id;

          comparePass(wifiPass, wifiHash)
            .then((check) => {
              if (check) {
                createNewLight(
                  charging, color,
                  dim, ip,
                  latitude, longitude, location,
                  name, switchedOn,
                  wifi, wifiId, wifiPass,
                )
                  .then((log) => {
                    resolve(log);
                  })
                  .catch((error) => {
                    reject(error);
                  });
              } else {
                const error = new Error('The wifi password provided is incorrect');
                error.code = 400;
                reject(error);
              }
            })
            .catch((error) => {
              error.code = 400;
              reject(error);
            });
        }
      })
      .catch((error) => {
        error.code = 400;
        reject(error);
      });
  });

const retrieveAllCtrl = () =>
  new Promise((resolve, reject) => {
    db.light
      .findAll()
      .then((lights) => {
        resolve(lights);
      })
      .catch((error) => {
        error.code = 500;
        reject(error);
      });
  });

const retrieveLogsCtrl = id =>
  new Promise((resolve, reject) => {
    db.changelog
      .findAll({
        where: {
          lightId: id,
        },
      })
      .then((data) => {
        if (data.length === 0) {
          const error = new Error('There are no logs for this device');
          error.code = 404;
          reject(error);
        } else {
          const logs = data.map((log) => {
            const logData = log.dataValues;
            return [logData.log, logData.createdAt];
          });
          resolve(logs);
        }
      })
      .catch((error) => {
        error.code = 400;
        reject(error);
      });
  });

const retrieveOneCtrl = id =>
  new Promise((resolve, reject) => {
    db.sequelize
      .query(`SELECT * FROM lights WHERE id = ${id}`)
      .then((light) => {
        if (light[0].length === 0) {
          const error = new Error('This light is not associated with any wifi');
          error.code = 404;
          reject(error);
        } else {
          resolve(light[0]);
        }
      })
      .catch((error) => {
        error.code = 400;
        reject(error);
      });
  });

export { newLightCtrl, retrieveAllCtrl, retrieveLogsCtrl, retrieveOneCtrl };
