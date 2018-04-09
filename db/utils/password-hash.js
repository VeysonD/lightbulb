import bcrypt from 'bcrypt';

const comparePass = (password, hash) =>
  new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (err, check) => {
      if (err) {
        reject(err);
      } else {
        resolve(check);
      }
    });
  });

const hashPass = (password, rounds) =>
  new Promise((resolve, reject) => {
    bcrypt.hash(password, rounds, (err, hash) => {
      if (err) {
        reject(err);
      } else {
        resolve(hash);
      }
    });
  });


export { comparePass, hashPass };
