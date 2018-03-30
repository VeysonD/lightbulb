const HEROKU_URL = JSON.stringify('https://localhost:5000');
//TODO: Add a heroku link to line 5

if (process.env.NODE_ENV === 'production') {
  HEROKU_URL = JSON.stringify('https://INSERT-HEROKU-LINK.herokuapp.com');
}

module.exports = HEROKU_URL;
