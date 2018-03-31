import dotenv from 'dotenv';

dotenv.config();

import app from './server/request-handler';

const { SERVER, PORT } = process.env;

app.listen(PORT, () => {
  console.log(`Server is listening at ${SERVER}:${PORT}`);
});
