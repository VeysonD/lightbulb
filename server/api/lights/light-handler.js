import express from 'express';

import handleAuth from './auth/light-auth-settings';
import {
  wifiChange,
  wifiPass,
  wifiSwitch,
} from './wifi-settings/light-wifi-settings';
import {
  changeColor,
  changeDim,
  changeIp,
  changeSwitch,
  deleteLight,
  retrieveAll,
  retrieveOne,
} from './settings/light-settings';


const lightRouter = express.Router();

lightRouter.get('/all', retrieveAll);
lightRouter.get('/:id', retrieveOne);

lightRouter.post('/:id/*', handleAuth);

lightRouter.post('/:id/color', changeColor);
lightRouter.post('/:id/dim', changeDim);
lightRouter.post('/:id/switch', changeSwitch);
lightRouter.post('/:id/ip', changeIp);

lightRouter.post('/:id/wifi-change', wifiChange);
lightRouter.post('/:id/wifi-pass-update', wifiPass);
lightRouter.post('/:id/wifi-switch', wifiSwitch);

lightRouter.delete('/:id/delete', deleteLight);

export default lightRouter;
