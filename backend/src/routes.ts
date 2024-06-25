import { Router } from 'express';
import healthz from './controllers/healthz';
import { isLogged } from './middlewares';
import actionRouter from './routes/action';
import aiRouter from './routes/ai';
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
router.use('/alerts', isLogged, alertRouter);
router.use('/actions', isLogged, actionRouter);
router.use('/ai', isLogged, aiRouter);
router.get('/healthz', healthz);

export default router;
