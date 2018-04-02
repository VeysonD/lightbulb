import express from 'express';

import handleAuth from './auth/light-auth-settings';
import { wifiOff, wifiSwitch } from './wifi-settings/light-wifi-settings';
import {
  changeColor,
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
lightRouter.post('/:id/switch', changeSwitch);

lightRouter.post('/:id/wifi-off', wifiOff);
lightRouter.post('/:id/wifi-switch', wifiSwitch);

lightRouter.delete('/:id/delete', deleteLight);

export default lightRouter;
