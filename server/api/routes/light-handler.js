import express from 'express';

import handleAuth from './lights/light-auth-settings';
import {
  newLight,
  retrieveAll,
  retrieveLogs,
  retrieveOne,
} from './lights/light-general';
import {
  wifiChange,
  wifiPass,
  wifiToggleOff,
} from './lights/light-wifi-settings';
import {
  changeColor,
  changeDim,
  changeIp,
  changePosition,
  changeSwitch,
  deleteLight,
} from './lights/light-settings';


const lightRouter = express.Router();

lightRouter.get('/all', retrieveAll);
lightRouter.get('/:id', retrieveOne);
lightRouter.get('/:id/logs', retrieveLogs);

lightRouter.post('/new', newLight);
lightRouter.post('/:id/*', handleAuth);

lightRouter.post('/:id/color', changeColor);
lightRouter.post('/:id/dim', changeDim);
lightRouter.post('/:id/position', changePosition);
lightRouter.post('/:id/switch', changeSwitch);
lightRouter.post('/:id/ip', changeIp);

lightRouter.post('/:id/wifi-change', wifiChange);
lightRouter.post('/:id/wifi-pass-update', wifiPass);
lightRouter.post('/:id/wifi-toggle-off', wifiToggleOff);

lightRouter.delete('/:id/*', handleAuth);
lightRouter.delete('/:id/delete', deleteLight);

export default lightRouter;
