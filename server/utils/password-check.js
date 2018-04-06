import bcrypt from 'bcrypt';

const comparePass = (password, hash) => bcrypt.compare(password, hash, (err, check) => check);

const hashPass = (password, rounds) => bcrypt.hash(password, rounds, (err, hash) => hash);

export { comparePass, hashPass };
