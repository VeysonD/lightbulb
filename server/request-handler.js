import express from 'express';

const app = express();

app.use(express.static('public'));

app.get('/', (req, res, next) => {
  console.log('Testing get');
  res.end('GET');
});

app.get('/api', (req, res, next) => {
  console.log('Testing API');
  res.end('API');
});


export default app;
