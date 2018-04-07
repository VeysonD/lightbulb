import express from 'express';

import lightRouter from './routes/light-handler';
import clockRouter from './routes/clock-handler';
import wifiRouter from './routes/wifi-handler';

const router = express.Router();

router.use('/lights', lightRouter);
router.use('/clocks', clockRouter);
router.use('/wifis', wifiRouter);

export default router;
