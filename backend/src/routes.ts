import { Router } from 'express';
import userRouter from './routes/user';
import chatbotRouter from './routes/chatbot';
import authRouter from './routes/auth';

const router = Router();

router.use('/users', userRouter);
router.use('/chatbot', chatbotRouter);
router.use('/auth', authRouter);

export default router;
