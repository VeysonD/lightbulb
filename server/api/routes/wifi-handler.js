import express from 'express';

import { retrieveAll } from './wifis/wifi-general';

const wifiRouter = express.Router();

wifiRouter.get('/all', retrieveAll);

export default wifiRouter;
