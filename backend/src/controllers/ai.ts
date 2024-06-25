import { NextFunction, Request, Response } from 'express';
import checkMandatoryFields from '../utils/checkMandatoryFields';
import mistralAi from '../utils/mistralAi';

export default {
  post: async (req: Request, res: Response, next: NextFunction) => {
    try {
      checkMandatoryFields(['prompt'], req.body);
      const response = await mistralAi(req.body.prompt);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  },
};
