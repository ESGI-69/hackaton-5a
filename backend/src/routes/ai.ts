import { Router } from 'express';
import aiController from '../controllers/ai';

const router = Router();

router.post('/', aiController.post);

export default router;
