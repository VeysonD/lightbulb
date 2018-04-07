import db from './../../../../db/db-config';
import { comparePass } from './../../../utils/password-check';
import addLog from './../../changelogs/changelog-ctrl';


const createNewLight = (
  charging, color,
  dim, ip,
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
        wifi_id: wifiId,
        wifi_pass: wifiPass,
      })
      .then((light) => {
        const { id } = light.dataValues;
        const log = `${color} light was added to ${wifi} network`;
        addLog(log, 'lightId', id);
        resolve(log);
      })
      .catch((error) => {
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
          reject(new Error('There is no wifi by that name'));
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
                reject(new Error('The wifi password provided is incorrect'));
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
  });

const retrieveAllCtrl = () =>
  new Promise((resolve, reject) => {
    db.light
      .findAll()
      .then((lights) => {
        resolve(lights);
      })
      .catch((error) => {
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
          reject(new Error('There are no logs for this device'));
        } else {
          const logs = data.map((log) => {
            const logData = log.dataValues;
            return [logData.log, logData.createdAt];
          });
          resolve(logs);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });

const retrieveOneCtrl = id =>
  new Promise((resolve, reject) => {
    db.sequelize
      .query(`SELECT * FROM lights WHERE id = ${id}`)
      .then((light) => {
        resolve(light[0]);
      })
      .catch((error) => {
        reject(error);
      });
  });

export { newLightCtrl, retrieveAllCtrl, retrieveLogsCtrl, retrieveOneCtrl };
