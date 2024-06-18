import { NextFunction, Request, Response } from 'express';
import userService from '../service/user';
import checkMandatoryFields from '../utils/checkMandatoryFields';
import checkParams from '../utils/checkParams';

export default {
  post: async (req: Request, res: Response, next: NextFunction) => {
    try {
      checkMandatoryFields(['username', 'password'], req.body);
      const user = await userService.create(req.body);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  },

  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      checkMandatoryFields(['username', 'password'], req.body);
      const user = await userService.findForLogin(req.body.username);
      if (!user) {
        return res.status(401).send({
          code: 'invalid_credentials',
          message: 'Invalid credentials',
        });
      }
      if (!await userService.checkPassword(req.body.password, user.password)) {
        return res.status(401).send({
          code: 'invalid_credentials',
          message: 'Invalid credentials',
        });
      }
      const token = userService.generateToken(user);
      res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  },

  me: (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(200).send(req.user);
    } catch (error) {
      next(error);
    }
  },
};
