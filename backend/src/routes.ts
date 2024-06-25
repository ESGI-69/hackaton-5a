import { Router } from 'express';
import healthz from './controllers/healthz';
import alertRouter from './routes/alert';
import authRouter from './routes/auth';
import chatbotRouter from './routes/chatbot';
import patientRouter from './routes/patient';
import userRouter from './routes/user';

const router = Router();

router.use('/users', userRouter);
router.use('/chatbot', chatbotRouter);
router.use('/auth', authRouter);
router.use('/patients', patientRouter);
router.use('/alerts', alertRouter);
router.get('/healthz', healthz);

export default router;
