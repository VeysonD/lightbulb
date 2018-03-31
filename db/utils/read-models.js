import fs from 'fs';
import path from 'path';

const readModel = (db, directory, sequelize) => {
  const files = [];
  const getAllModels = (dir) => {
    fs.readdirSync(dir)
      .forEach((file) => {
        const name = path.join(dir, file);
        const isDirectory = fs.statSync(name).isDirectory();
        if (isDirectory) {
          getAllModels(name);
        } else {
          files.push(name);
        }
      });
  };
  getAllModels(directory);


  files.forEach((file) => {
    const model = sequelize.import(file);
    db[model.name] = model;
  });

  Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });
  return db;
};


export default readModel;
