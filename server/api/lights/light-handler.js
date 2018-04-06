import express from 'express';

import handleAuth from './endpoints/auth/light-auth-settings';
import {
  newLight,
  retrieveAll,
  retrieveLogs,
  retrieveOne,
} from './endpoints/general/light-general';
import {
  wifiChange,
  wifiPass,
  wifiToggleOff,
} from './endpoints/wifi-settings/light-wifi-settings';
import {
  changeColor,
  changeDim,
  changeIp,
  changeSwitch,
  deleteLight,
} from './endpoints/settings/light-settings';


const lightRouter = express.Router();

lightRouter.get('/all', retrieveAll);
lightRouter.get('/:id', retrieveOne);
lightRouter.get('/:id/logs', retrieveLogs);

lightRouter.post('/new', newLight);
lightRouter.post('/:id/*', handleAuth);

lightRouter.post('/:id/color', changeColor);
lightRouter.post('/:id/dim', changeDim);
lightRouter.post('/:id/switch', changeSwitch);
lightRouter.post('/:id/ip', changeIp);

lightRouter.post('/:id/wifi-change', wifiChange);
lightRouter.post('/:id/wifi-pass-update', wifiPass);
lightRouter.post('/:id/wifi-toggle-off', wifiToggleOff);

lightRouter.delete('/:id/delete', deleteLight);

export default lightRouter;
