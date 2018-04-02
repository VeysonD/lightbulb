import db from './../../../db/db-config';

const addLog = (logMessage, item, id, req, res) => {
  const entry = {};
  entry[item] = id;
  entry.log = logMessage;
  db.changelog
    .create(entry)
    .then((changelog) => {
      res.send(changelog);
    })
    .catch((error) => {
      console.error(error);
      res.send('There was an error when inserting a new log');
    });
};

export default addLog;
