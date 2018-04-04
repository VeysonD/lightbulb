import dotenv from 'dotenv';

dotenv.config();

const app = require('./server/request-handler').default;

const { SERVER, PORT } = process.env;

app.listen(PORT, () => {
  console.log(`Server is listening at ${SERVER}:${PORT}`);
});
