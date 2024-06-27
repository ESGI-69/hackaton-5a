import { Router } from 'express';
import userController from '../controllers/user';
import { isLogged } from '../middlewares';

const router = Router();

router.post('/', userController.post);
router.get('/', userController.getAll);
router.get('/me', isLogged, userController.me);

export default router;
