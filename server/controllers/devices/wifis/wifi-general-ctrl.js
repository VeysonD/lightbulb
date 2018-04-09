import db from './../../../../db/db-config';

const addWifiCtrl = (
  ssid, password, switchedOn,
  protocol, securityType,
  networkBand, networkChannel,
  ip4, ip4Dns,
  latitude, longitude, location,
  manufacturer, description,
  driverVersion, physicalAddress,
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
        const log = `${ssid} was added to the network`;
        console.log('What does the wifi look like: ', wifi);
        resolve(wifi);
        // addLog(log, 'wifiId', );
      })
      .catch((error) => {
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
        reject(error);
      });
  });

const retrieveOneCtrl = id =>
  new Promise((resolve, reject) => {
    db.sequelize
      .query(`SELECT * FROM wifis WHERE id=${id}`)
      .then((wifi) => {
        console.log('What does retrieve one wifi look like: ', wifi);
        resolve(wifi);
      })
      .catch((error) => {
        reject(error);
      });
  });

export { addWifiCtrl, retrieveAllCtrl, retrieveOneCtrl };
