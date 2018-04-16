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
      res.status(201).send(wifi);
    })
    .catch((error) => {
      console.error(error);
      res.status(error.code).send(`${error.name}: ${error.message}`);
    });
};

const retrieveAll = (req, res) => {
  retrieveAllCtrl()
    .then((wifis) => {
      res.send(wifis);
    })
    .catch((error) => {
      console.error(error);
      res.status(error.code).send(`${error.name}: ${error.message}`);
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
      res.status(error.code).send(`${error.name}: ${error.message}`);
    });
};

export { addWifi, retrieveAll, retrieveOne };
