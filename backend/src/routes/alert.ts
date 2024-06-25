import { Router } from 'express';
import alertController from '../controllers/alert';

const router = Router();

router.get('/', alertController.get);
router.get('/:id', alertController.getById);
router.patch('/:id', alertController.patch);

export default router;
