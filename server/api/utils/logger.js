import db from './../../../db/db-config';

const addLog = (logMessage, logError, item, id, req, res) => {
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
      res.send(logError);
    });
};

export default addLog;
