import {
  changeColorCtrl,
  changeDimCtrl,
  changeIpCtrl,
  changePositionCtrl,
  changeSwitchCtrl,
  deleteLightCtrl,
} from './../../../controllers/devices/lights/light-settings-ctrl';

const changeColor = (req, res) => {
  const { id } = req.locals;
  const { color } = req.body;

  changeColorCtrl(color, id)
    .then((log) => {
      res.send(log);
    })
    .catch((error) => {
      console.error(error);
      res.send(`${error.name}: ${error.message}`);
    });
};

const changeDim = (req, res) => {
  const { id } = req.locals;
  const { dim } = req.body;

  changeDimCtrl(dim, id)
    .then((log) => {
      res.send(log);
    })
    .catch((error) => {
      console.error(error);
      res.send(`${error.name}: ${error.message}`);
    });
};

const changeIp = (req, res) => {
  const { id } = req.locals;
  const { ip } = req.body;

  changeIpCtrl(id, ip)
    .then((log) => {
      res.send(log);
    })
    .catch((error) => {
      console.error(error);
      res.send(`${error.name}: ${error.message}`);
    });
};

const changePosition = (req, res) => {
  const { id } = req.locals;
  const { latitude, longitude, location } = req.body;

  changePositionCtrl(id, latitude, longitude, location)
    .then((log) => {
      res.send(log);
    })
    .catch((error) => {
      console.error(error);
      res.send(`${error.name}: ${error.message}`);
    });
};

const changeSwitch = (req, res) => {
  const { id } = req.locals;

  changeSwitchCtrl(id)
    .then((log) => {
      res.send(log);
    })
    .catch((error) => {
      console.error(error);
      res.send(`${error.name}: ${error.message}`);
    });
};

const deleteLight = (req, res) => {
  const { id } = req.params;

  deleteLightCtrl(id)
    .then((log) => {
      res.send(log);
    })
    .catch((error) => {
      console.error(error);
      res.send(`${error.name}: ${error.message}`);
    });
};


export {
  changeColor,
  changeDim,
  changeIp,
  changePosition,
  changeSwitch,
  deleteLight,
};
