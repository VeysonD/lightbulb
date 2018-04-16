import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';

import router from './api/api-handler';

const app = express();

app.use(express.static('public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.end('GET');
});

app.use('/api', router);

// Catch all error handler
app.use((req, res) => {
  res.status(404).send('Sorry can\'t find that!');
});


export default app;
