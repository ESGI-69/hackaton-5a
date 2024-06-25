import { Router } from 'express';
import actionController from '../controllers/action';

const router = Router();

router.post('/', actionController.post);
router.get('/', actionController.get);
router.get('/:id', actionController.getById);
router.patch('/:id', actionController.patch);

export default router;
