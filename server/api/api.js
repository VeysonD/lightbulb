import express from 'express';

import lamp from './lamp/lamp';

const router = express.Router();

router.use('/lamp', lamp);

export default router;
