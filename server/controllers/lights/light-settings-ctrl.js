import db from './../../../db/db-config';
import addLog from './../../utils/logger';

const changeColorCtrl = (color, id) =>
  new Promise((resolve, reject) => {
    db.light
      .update({
        color,
      }, {
        where: {
          id,
        },
        returning: true,
        individualHooks: true,
      })
      .then((light) => {
        if (light[1].length === 0) {
          reject(new Error('The light does not exist'));
        } else {
          const log = `${light[1][0].dataValues.name} changed to ${color}`;
          addLog(log, 'lightId', id);
          resolve(log);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });

const changeDimCtrl = (dim, id) =>
  new Promise((resolve, reject) => {
    if (dim) {
      db.light
        .update({
          dim,
        }, {
          where: {
            id,
          },
          returning: true,
          individualHooks: true,
        })
        .then((light) => {
          const { name } = light[1][0].dataValues;
          const log = `${name}'s dim setting has been turned to ${dim}%`;
          addLog(log, 'lightId', id);
          resolve(log);
        })
        .catch((error) => {
          reject(error);
        });
    } else {
      reject(new Error('Please provide the amount to dim the light'));
    }
  });

const changeIpCtrl = (id, ip) =>
  new Promise((resolve, reject) => {
    if (ip) {
      db.light
        .update({
          id,
        }, {
          where: {
            id,
          },
          returning: true,
          individualHooks: true,
        })
        .then((light) => {
          const { name } = light[1][0].dataValues;
          const log = `${name}'s IP was updated to ${ip}`;
          addLog(log, 'lightId', id);
          resolve(log);
        })
        .catch((error) => {
          reject(error);
        });
    } else {
      reject(new Error('Please provide an IP'));
    }
  });

const changePositionCtrl = (id, latitude, longitude, location) =>
  new Promise((resolve, reject) => {
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
          individualHooks: true,
        })
        .then((light) => {
          const { name } = light[1][0].dataValues;
          const log = `${name}'s position was updated to ${location}`;
          addLog(log, 'lightId', id);
          resolve(log);
        })
        .catch((error) => {
          reject(error);
        });
    } else {
      reject(new Error('Please provide the proper coordinates'));
    }
  });

const changeSwitchCtrl = id =>
  new Promise((resolve, reject) => {
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
        addLog(log, 'lightId', id);
        resolve(log);
      })
      .catch((error) => {
        reject(error);
      });
  });

const deleteLightCtrl = id =>
  new Promise((resolve, reject) => {
    db.light
      .destroy({
        where: {
          id,
        },
        returning: true,
      })
      .then((deletedLight) => {
        const log = `Light ${deletedLight} was deleted`;
        addLog(log, 'lightId', id);
        resolve(log);
      })
      .catch((error) => {
        reject(error);
      });
  });

export {
  changeColorCtrl,
  changeDimCtrl,
  changeIpCtrl,
  changePositionCtrl,
  changeSwitchCtrl,
  deleteLightCtrl,
};
