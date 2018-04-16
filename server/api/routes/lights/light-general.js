import {
  newLightCtrl,
  retrieveAllCtrl,
  retrieveLogsCtrl,
  retrieveOneCtrl,
} from './../../../controllers/devices/lights/light-general-ctrl';

const newLight = (req, res) => {
  const {
    charging,
    color,
    dim,
    ip,
    latitude,
    longitude,
    location,
    name,
    switchedOn,
    wifi,
    wifiPass,
  } = req.body;

  newLightCtrl(
    charging, color,
    dim, ip,
    latitude, longitude, location,
    name, switchedOn,
    wifi, wifiPass,
  )
    .then((log) => {
      res.status(201).send(log);
    })
    .catch((error) => {
      console.error(error);
      res.status(error.code).send(`${error.name}: ${error.message}`);
    });
};

const retrieveAll = (req, res) => {
  retrieveAllCtrl()
    .then((lights) => {
      res.send(lights);
    })
    .catch((error) => {
      console.error(error);
      res.status(error.code).send(`${error.name}: ${error.message}`);
    });
};

const retrieveLogs = (req, res) => {
  const { id } = req.params;

  retrieveLogsCtrl(id)
    .then((logs) => {
      res.send(logs);
    })
    .catch((error) => {
      console.error(error);
      res.status(error.code).send(`${error.name}: ${error.message}`);
    });
};

const retrieveOne = (req, res) => {
  const { id } = req.params;

  retrieveOneCtrl(id)
    .then((light) => {
      res.send(light);
    })
    .catch((error) => {
      console.error(error);
      res.status(error.code).send(`${error.name}: ${error.message}`);
    });
};

export { newLight, retrieveAll, retrieveLogs, retrieveOne };
