import db from './../../../../db/db-config';

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
        db.changelog
          .create({
            log: `${name}'s color changed to ${color}`,
            lightId: id,
          })
          .then((changelog) => {
            res.send(changelog);
          })
          .catch((error) => {
            console.error(error);
            res.send('There was an error when inserting a new log');
          });
      }
    })
    .catch((error) => {
      console.error(error);
      res.send('There was an error when updating the color');
    });
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
      db.changelog
        .create({
          log: `${name} was switched ${onText}`,
          lightId: id,
        })
        .then((changelog) => {
          res.send(changelog);
        })
        .catch((error) => {
          console.error(error);
          res.send('There was an error when inserting a new log');
        });
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

export { changeColor, changeSwitch, deleteLight };
