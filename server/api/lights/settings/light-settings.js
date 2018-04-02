import db from './../../../../db/db-config';
import addLog from './../../utils/logger';

const changeColor = (req, res) => {
  const { id } = req.locals;
  const { color } = req.body;
  db.light
    .update({
      color,
    }, {
      where: {
        id,
      },
      returning: true,
    })
    .then((light) => {
      if (light[1].length === 0) {
        res.send('That light does not exist');
      } else {
        const { name } = light[1][0].dataValues;
        const log = `${name}'s color changed to ${color}`;
        addLog(log, 'lightId', id, req, res);
      }
    })
    .catch((error) => {
      console.error(error);
      res.send('There was an error when updating the color');
    });
};

const changeDim = (req, res) => {
  const { id } = req.locals;
  const { dim } = req.body;

  if (dim) {
    db.light
      .update({
        dim,
      }, {
        where: {
          id,
        },
        returning: true,
      })
      .then((light) => {
        const { name } = light[1][0].dataValues;
        const log = `${name}'s dim setting has been turned to ${dim}%`;
        addLog(log, 'lightId', id, req, res);
      })
      .catch((error) => {
        console.error(error);
        res.send('There was an error when updating the dim setting');
      });
  } else {
    res.send('Please provide the amount to dim the light');
  }
};

const changeIp = (req, res) => {
  const { id } = req.locals;
  const { ip } = req.body;

  if (ip) {
    db.light
      .update({
        ip,
      }, {
        where: {
          id,
        },
        returning: true,
      })
      .then((light) => {
        const { name } = light[1][0].dataValues;
        const log = `${name}'s IP was updated to ${ip}`;
        addLog(log, 'lightId', id, req, res);
      })
      .catch((error) => {
        console.error(error);
        res.send('There was an error when updating the IP');
      });
  } else {
    res.send('Please provide an IP');
  }
};

const changePosition = (req, res) => {
  const { id } = req.locals;
  const { latitude, longitude, location } = req.body;

  if (latitude && longitude && location) {
    db.light
      .update({
        latitude,
        longitude,
        location,
      }, {
        where: {
          id,
        },
        returning: true,
      })
      .then((light) => {
        const { name } = light[1][0].dataValues;
        const log = `${name}'s position was updated to ${location}`;
        addLog(log, 'lightId', id, req, res);
      })
      .catch((error) => {
        console.error(error);
        res.send('There was an error when updating the position');
      });
  } else {
    res.send('Please provide the proper coordinates');
  }
};

const changeSwitch = (req, res) => {
  const { id } = req.locals;
  db.sequelize
    .query(`UPDATE lights SET switched_on = NOT switched_on WHERE id = ${id} RETURNING name, switched_on`)
    .spread((light) => {
      const { name } = light[0];
      const on = light[0].switched_on;
      let onText = '';
      if (on) {
        onText = 'on';
      } else {
        onText = 'off';
      }
      const log = `${name} was switched ${onText}`;
      addLog(log, 'lightId', id, req, res);
    })
    .catch((error) => {
      console.error(error);
      res.send('There was an error when switching the light');
    });
};

const deleteLight = (req, res) => {
  const { id } = req.params;
  db.light
    .destroy({
      where: {
        id,
      },
      returning: true,
    })
    .then((deletedLight) => {
      res.send(`Light ${deletedLight} was deleted`);
    })
    .catch((error) => {
      console.error(error);
      res.send('There was an error while removing the light');
    });
};

const retrieveAll = (req, res) => {
  db.light
    .findAll()
    .then((lights) => {
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

export {
  changeColor,
  changeDim,
  changeIp,
  changePosition,
  changeSwitch,
  deleteLight,
  retrieveAll,
  retrieveOne,
};
