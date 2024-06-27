import { Router } from 'express';
import alertController from '../controllers/alert';

const router = Router();

router.get('/assigned', alertController.getAssigned);
router.get('/unasigned', alertController.getUnasigned);
router.post('/:id/close', alertController.close);
router.get('/:id', alertController.getById);
router.patch('/:id', alertController.patch);
router.post('/:id/message', alertController.sendDoctorMessage);

export default router;
