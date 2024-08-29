import { Router } from 'express';
import { generateFlag, checkFlag } from '../controllers/flagController';

const router = Router();

router.post('/generate', generateFlag);
router.post('/check', checkFlag);

export default router;