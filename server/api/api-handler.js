import express from 'express';

import light from './light/light';

const router = express.Router();

router.use('/light', light);

export default router;
