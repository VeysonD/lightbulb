import express from 'express';

import lightRouter from './lights/light-handler';
import clockRouter from './clocks/clock-handler';
import wifiRouter from './wifis/wifi-handler';

const router = express.Router();

router.use('/lights', lightRouter);
router.use('/clocks', clockRouter);
router.use('/wifis', wifiRouter);

export default router;
