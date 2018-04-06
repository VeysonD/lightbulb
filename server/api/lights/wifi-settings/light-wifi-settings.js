import {
  wifiChangeCtrl,
  wifiPassCtrl,
  wifiToggleOffCtrl,
} from './../../../controllers/lights/light-wifi-settings-ctrl';


const wifiChange = (req, res) => {
  const { id } = req.locals;
  const { wifi, password } = req.body;
  if (wifi && password) {
    wifiChangeCtrl(wifi, password, id)
      .then(() => {
        res.send(`Wifi was changed to ${wifi}`);
      })
      .catch((error) => {
        console.error(error);
        res.send('There was an error while changing the wifi');
      });
  } else {
    res.send('An invalid wifi or password was provided');
  }
};

const wifiPass = (req, res) => {
  const { id } = req.locals;
  const { password } = req.body;

  if (password) {
    wifiPassCtrl(password, id)
      .then(() => {
        res.send(`Password updated to ${password}`);
      })
      .catch((error) => {
        console.error(error);
        res.send('There was an error while updating the password');
      });
  } else {
    res.send('An invalid wifi or password was provided');
  }
};

const wifiToggleOff = (req, res) => {
  const { id } = req.locals;
  wifiToggleOffCtrl(id)
    .then(() => {
      res.send(`Light ${id} toggled off from its wifi`);
    })
    .catch((error) => {
      console.error(error);
      res.send('There was an error when switching the light connection to the wifi');
    });
};

export { wifiChange, wifiPass, wifiToggleOff };
