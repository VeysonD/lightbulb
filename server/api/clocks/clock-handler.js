import express from 'express';
import db from './../../../db/db-config';

const clockRouter = express.Router();

clockRouter.get('/all', (req, res) => {
  db.clock
    .findAll()
    .then((clocks) => {
      res.send(clocks);
    });
});

export default clockRouter;
