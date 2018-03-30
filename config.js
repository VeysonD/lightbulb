const HEROKU_URL = JSON.stringify('https://localhost:5000');

if (process.env.NODE_ENV === 'production') {
  HEROKU_URL = JSON.stringify('https://my-lightbulbs.herokuapp.com/');
}

module.exports = HEROKU_URL;
