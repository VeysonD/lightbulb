import express from 'express';
import morgan from 'morgan';

import router from './api/api-handler.js';

const app = express();

app.use(express.static('public'));
app.use(morgan('dev'));

app.get('/', (req, res, next) => {
  console.log('Testing get');
  res.end('GET');
});

app.use('/api', router);


export default app;
