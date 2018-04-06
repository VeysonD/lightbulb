import db from './../../db/db-config';

const addLog = (logMessage, item, id) => {
  const entry = {};
  entry[item] = id;
  entry.log = logMessage;
  db.changelog
    .create(entry)
    .then((changelog) => {
      console.log('Changelog: ', changelog);
    })
    .catch((error) => {
      console.error(error);
    });
};

export default addLog;
