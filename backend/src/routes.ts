import { Router } from 'express';
import healthz from './controllers/healthz';
import authRouter from './routes/auth';
import chatbotRouter from './routes/chatbot';
import userRouter from './routes/user';

const router = Router();

router.use('/users', userRouter);
router.use('/chatbot', chatbotRouter);
router.use('/auth', authRouter);
router.get('/healthz', healthz);

export default router;
