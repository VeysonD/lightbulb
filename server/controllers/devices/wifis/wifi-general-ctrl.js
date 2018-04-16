import db from './../../../../db/db-config';
import addLog from './../../changelogs/changelog-ctrl';

const addWifiCtrl = (
  ssid, password, switchedOn = false,
  protocol, securityType,
  networkBand, networkChannel,
  ip4, ip4Dns = null,
  latitude, longitude, location,
  manufacturer = null, description = null,
  driverVersion = null, physicalAddress,
) =>
  new Promise((resolve, reject) => {
    db.wifi
      .create({
        ssid,
        password,
        switched_on: switchedOn,
        protocol,
        security_type: securityType,
        network_band: networkBand,
        network_channel: networkChannel,
        ip4_address: ip4,
        ip4_dns: ip4Dns,
        latitude,
        longitude,
        location,
        manufacturer,
        description,
        driver_version: driverVersion,
        physical_address: physicalAddress,
      }, {
        returning: true,
      })
      .then((wifi) => {
        const wifiId = wifi.dataValues.id;
        const log = `${ssid} was added to the network`;

        addLog(log, 'wifiId', wifiId);
        resolve(wifi);
      })
      .catch((error) => {
        error.code = 400;
        reject(error);
      });
  });

const retrieveAllCtrl = () =>
  new Promise((resolve, reject) => {
    db.wifi
      .findAll()
      .then((wifis) => {
        resolve(wifis);
      })
      .catch((error) => {
        error.code = 500;
        reject(error);
      });
  });

const retrieveOneCtrl = id =>
  new Promise((resolve, reject) => {
    db.sequelize
      .query(`SELECT * FROM wifis WHERE id=${id}`)
      .then((wifi) => {
        if (wifi[0].length === 0) {
          const error = new Error('That wifi does not exist');
          error.code = 400;
          reject(error);
        } else {
          resolve(wifi[0]);
        }
      })
      .catch((error) => {
        error.code = 400;
        reject(error);
      });
  });

export { addWifiCtrl, retrieveAllCtrl, retrieveOneCtrl };
