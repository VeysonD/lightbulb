import bcrypt from 'bcrypt';

const comparePass = (password, hash) =>
  new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (err, check) => {
      if (err) {
        reject(new Error(`There was an error when checking the password: ${err}`));
      } else {
        resolve(check);
      }
    });
  });

const hashPass = (password, rounds) => bcrypt.hash(password, rounds, (err, hash) => hash);

export { comparePass, hashPass };
