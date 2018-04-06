import express from 'express';

import handleAuth from './auth/light-auth-settings';
import {
  newLight,
  retrieveAll,
  retrieveLogs,
  retrieveOne,
} from './general/light-general';
import {
  wifiChange,
  wifiPass,
  wifiToggleOff,
} from './wifi-settings/light-wifi-settings';
import {
  changeColor,
  changeDim,
  changeIp,
  changeSwitch,
  deleteLight,
} from './settings/light-settings';


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
