import express from 'express';

import lightRouter from './lights/light-handler';
import clockRouter from './clocks/clock-handler';

const router = express.Router();

router.use('/lights', lightRouter);
router.use('/clocks', clockRouter);

export default router;
