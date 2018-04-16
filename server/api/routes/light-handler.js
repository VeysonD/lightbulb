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
lightRouter.put('/:id/*', handleAuth);

lightRouter.put('/:id/color', changeColor);
lightRouter.put('/:id/dim', changeDim);
lightRouter.put('/:id/position', changePosition);
lightRouter.put('/:id/switch', changeSwitch);
lightRouter.put('/:id/ip', changeIp);

lightRouter.put('/:id/wifi-change', wifiChange);
lightRouter.put('/:id/wifi-pass-update', wifiPass);
lightRouter.put('/:id/wifi-toggle-off', wifiToggleOff);

lightRouter.delete('/:id/*', handleAuth);
lightRouter.delete('/:id/delete', deleteLight);

export default lightRouter;
