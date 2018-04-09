import { addWifiCtrl, retrieveAllCtrl, retrieveOneCtrl } from './../../../controllers/devices/wifis/wifi-general-ctrl';

const addWifi = (req, res) => {
  const {
    ssid, password, switchedOn,
    protocol, securityType,
    networkBand, networkChannel,
    ip4, ip4Dns,
    latitude, longitude, location,
    manufacturer, description,
    driverVersion, physicalAddress,
  } = req.body;

  addWifiCtrl(
    ssid, password, switchedOn,
    protocol, securityType,
    networkBand, networkChannel,
    ip4, ip4Dns,
    latitude, longitude, location,
    manufacturer, description,
    driverVersion, physicalAddress,
  )
    .then((wifi) => {
      console.log('What is the wifi being sent in the response: ', wifi);
      res.send(wifi);
    })
    .catch((error) => {
      console.error(error);
      res.send(error);
    });
};

const retrieveAll = (req, res) => {
  retrieveAllCtrl()
    .then((wifis) => {
      res.send(wifis);
    })
    .catch((error) => {
      console.error(error);
      res.send(error);
    });
};

const retrieveOne = (req, res) => {
  const { id } = req.params;

  retrieveOneCtrl(id)
    .then((wifi) => {
      res.send(wifi);
    })
    .catch((error) => {
      console.error(error);
      res.send(error);
    });
};

export { addWifi, retrieveAll, retrieveOne };
