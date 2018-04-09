import express from 'express';

import { addWifi, retrieveAll, retrieveOne } from './wifis/wifi-general';

const wifiRouter = express.Router();

wifiRouter.get('/all', retrieveAll);
wifiRouter.get('/:id', retrieveOne);

wifiRouter.post('/new', addWifi);

export default wifiRouter;
