import { NextFunction, Request, Response } from 'express';
import OpenAIQueryBuilder from '../utils/openAi';

export default {
  sendPrompt: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const openAiQueryBuilder = OpenAIQueryBuilder.getInstance();
      const prompt = req.body.prompts;
      const openAiResponse = await openAiQueryBuilder.chatbot(prompt);
      const openAiRecipie = openAiResponse.choices[0].message;
      res.status(200).send(openAiRecipie);
    } catch (error) {
      next(error);
    }
  },
};
