import express from 'express';
import db from './../../../db/db-config';

const lightRouter = express.Router();


lightRouter.get('/all', (req, res) => {
  db.light
    .findAll()
    .then((lights) => {
      res.send(lights);
    });
});

lightRouter.get('/:id', (req, res) => {
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
});

lightRouter.post('/:id/*', (req, res, next) => {
  const { id } = req.params;
  const { wifi } = req.body;
  db.sequelize
    .query(`SELECT connected_wifi FROM lights WHERE id = ${id}`)
    .then((connectionStatus) => {
      if (connectionStatus[0].length === 0) {
        res.send('This light is not associated with any wifi');
      } else if (!connectionStatus[0][0].connected_wifi) {
        req.locals = { id, wifi };
        // if it isn't connected to wifi
        // check if the wifi is given from line 30;
          // if it isn't then res.send and error out res.send(please provide wifi to connect to)
          //if it is then check if the wifi corresponds to a wifi in the DB
            // if the wifi is in the database then update the wifi_id and update connected_wifi to true
              // update changelog to show that light connceted to wifi_id
                //next() (??? or res.send???)
            // if the wifi isn't in the database then res.send and error out res.send(please use a valid wifi)
        next();
      } else {
        req.locals = { id, wifi };
        next();
      }
    })
    .catch((error) => {
      console.error(error);
      res.send('There was an error when checking the lights');
    });
});

lightRouter.post('/:id/color', (req, res) => {
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
});


lightRouter.post('/:id/switch', (req, res) => {
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
});

lightRouter.post('/:id/wifi-off', (req, res) => {
  const { id } = req.locals;
  db.sequelize
    .query(`UPDATE lights SET connected_wifi = NOT connected_wifi WHERE id = ${id} RETURNING name, connected_wifi, (SELECT ssid FROM wifis INNER JOIN lights ON lights.wifi_id=wifis.id)`)
    .spread((light) => {
      const { name, ssid } = light[0];
      const connectedWifi = light[0].connected_wifi;
      let textLog = '';
      if (connectedWifi) {
        textLog = 'connected to';
      } else {
        textLog = 'disconnected from';
      }
      db.changelog
        .create({
          log: `${name} was ${textLog} ${ssid} wifi`,
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
      res.send('There was an error when switching the light connection to the wifi');
    });
});

lightRouter.post('/:id/wifi-switch', (req, res) => {
  const { id, wifi } = req.locals;
  if (wifi) {
    db.sequelize
      .query(`SELECT ssid from wifis WHERE ssid='${wifi}'`)
      .then((ssid) => {
        if (ssid[0].length === 0) {
          res.send('The wifi does not exist on the system');
        } else {
          db.sequelize
            .query(`UPDATE lights SET wifi_id=(SELECT id FROM wifis where ssid='${wifi}') WHERE id=${id} RETURNING name`)
            .then((light) => {
              console.log('WHAT IS THE LIGHT: ', light);
              const { name } = light[0][0];
              db.changelog
                .create({
                  log: `${name} switched to ${wifi} wifi`,
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
              res.send('There was an error when updating the wifi');
            });
        }
      })
      .catch((error) => {
        console.error(error);
        res.send('There was an error when trying to find the wifi');
      });
  } else {
    res.send('An invalid wifi was provided');
  }
});

lightRouter.delete('/:id/delete', (req, res) => {
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
});

export default lightRouter;
