import { Router } from 'express';
import alertController from '../controllers/alert';

const router = Router();

router.get('/assigned', alertController.getAssigned);
router.get('/unasigned', alertController.getUnasigned);
router.get('/:id', alertController.getById);
router.patch('/:id', alertController.patch);

export default router;
