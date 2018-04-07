import {
  wifiChangeCtrl,
  wifiPassCtrl,
  wifiToggleOffCtrl,
} from './../../../controllers/lights/light-wifi-settings-ctrl';


const wifiChange = (req, res) => {
  const { id } = req.locals;
  const { wifi, password } = req.body;

  wifiChangeCtrl(wifi, password, id)
    .then((log) => {
      res.send(log);
    })
    .catch((error) => {
      console.error(error);
      res.send(`${error.name}: ${error.message}`);
    });
};

const wifiPass = (req, res) => {
  const { id } = req.locals;
  const { password } = req.body;

  wifiPassCtrl(password, id)
    .then((log) => {
      res.send(log);
    })
    .catch((error) => {
      console.error(error);
      res.send(`${error.name}: ${error.message}`);
    });
};

const wifiToggleOff = (req, res) => {
  const { id } = req.locals;
  wifiToggleOffCtrl(id)
    .then((log) => {
      res.send(log);
    })
    .catch((error) => {
      console.error(error);
      res.send(`${error.name}: ${error.message}`);
    });
};

export { wifiChange, wifiPass, wifiToggleOff };
