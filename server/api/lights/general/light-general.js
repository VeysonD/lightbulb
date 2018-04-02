import bcrypt from 'bcrypt';
import db from './../../../../db/db-config';
import addLog from './../../utils/logger';

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
        res.send('There is no wifi by that name');
      } else {
        const wifiHash = data[0].dataValues.password;
        const wifiId = data[0].dataValues.id;
        console.log('shape of the data: ', data);
        bcrypt.compare(wifiPass, wifiHash, (err, check) => {
          if (check) {
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
                addLog(log, 'lightId', id, req, res);
              })
              .catch((error) => {
                console.error(error);
                res.send('There was an error when entering the new light data');
              });
          } else {
            res.send('Wifi password is wrong');
          }
        });
      }
    })
    .catch((error) => {
      console.error(error);
      res.send('There was an error when checking the wifi');
    });
};

const retrieveAll = (req, res) => {
  db.light
    .findAll()
    .then((lights) => {
      console.log(lights);
      res.send(lights);
    });
};

const retrieveOne = (req, res) => {
  const { id } = req.params;
  db.sequelize
    .query(`SELECT * FROM lights WHERE id = ${id}`)
    .then((light) => {
      res.send(light[0]);
    })
    .catch((error) => {
      console.error(error);
      res.send('There was an error with your request');
    });
};

export { newLight, retrieveAll, retrieveOne };
