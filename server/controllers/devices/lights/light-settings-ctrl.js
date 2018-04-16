import db from './../../../../db/db-config';
import addLog from './../../changelogs/changelog-ctrl';


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
        const { name } = light[1][0].dataValues;
        const log = `${name} changed to ${color}`;

        resolve(log);
      })
      .catch((error) => {
        error.code = 400;
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

          resolve(log);
        })
        .catch((error) => {
          error.code = 400;
          reject(error);
        });
    } else {
      const error = new Error('Please provide the amount to dim the light');
      error.code = 400;
      reject(error);
    }
  });

const changeIpCtrl = (id, ip) =>
  new Promise((resolve, reject) => {
    if (ip) {
      db.light
        .update({
          ip,
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

          resolve(log);
        })
        .catch((error) => {
          error.code = 400;
          reject(error);
        });
    } else {
      const error = new Error('Please provide an IP');
      error.code = 400;
      reject(error);
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
          const log = `${name}'s position was updated to ${location} with coordinates of (${latitude}, ${longitude})`;

          resolve(log);
        })
        .catch((error) => {
          error.code = 400;
          reject(error);
        });
    } else {
      const error = new Error('Please provide location, latitude, and longtide');
      error.code = 400;
      reject(error);
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
        error.code = 400;
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
        individualHooks: true,
      })
      .then(() => {
        const log = `Light ${id} was deleted`;

        resolve(log);
      })
      .catch((error) => {
        error.code = 400;
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
