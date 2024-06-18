import { Router } from 'express';
import chatbotController from '../controllers/chatbot';

const router = Router();

router.post('/', chatbotController.sendPrompt);

export default router;