import handleAuthCtrl from './../../../controllers/devices/lights/light-auth-ctrl';


const handleAuth = (req, res, next) => {
  const { id } = req.params;
  const { password } = req.body;

  handleAuthCtrl(id, password)
    .then((log) => {
      console.log('Connection log: ', log);
      req.locals = { id };
      next();
    })
    .catch((error) => {
      console.error(error);
      res.status(error.code).send(`${error.name}: ${error.message}`);
    });
};


export default handleAuth;
