import app from './server/request-handler';

const PORT = process.env.PORT || 5000;
const SERVER = process.env.SERVER || 'https://127.0.0.1';

const server = app.listen(PORT, () => {
  console.log(`Server is listening at ${SERVER}:${PORT}`);
});
