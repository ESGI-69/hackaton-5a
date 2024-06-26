import { Router } from 'express';
import patientController from '../controllers/patient';

const router = Router();

router.post('/', patientController.post);
router.get('/', patientController.get);
router.patch('/:id', patientController.patch);
router.post('/:id/message', patientController.postMessage);

export default router;
