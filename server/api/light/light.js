import express from 'express';

const lamp = express.Router();

lamp.get('/on', (req, res) => {
  res.send('light is on');
});

export default lamp;
