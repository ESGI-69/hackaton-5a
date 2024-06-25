import { NextFunction, Request, Response } from 'express';
import actionService from '../service/action';
import checkMandatoryFields from '../utils/checkMandatoryFields';

export default {
  post: async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user)
        throw new Error('You must be logged in to create a recipe');
      checkMandatoryFields(['type', 'comment', 'alertId'], req.body);
      const action = await actionService.create(req.body, req.user.id);
      res.status(201).json(action);
    } catch (error) {
      next(error);
    }
  },

  get: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const actions = await actionService.getAll();
      res.status(200).json({
        count: actions.length,
        results: actions,
      });
    } catch (error) {
      next(error);
    }
  },

  getById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id, 10);
      const action = await actionService.getById(id);
      res.status(200).json(action);
    } catch (error) {
      next(error);
    }
  },

  patch: async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user)
        throw new Error('You must be logged in to update an Action');
      const id = parseInt(req.params.id, 10);
      const action = await actionService.update(id, req.body, req.user.id);
      res.status(200).json(action);
    } catch (error) {
      next(error);
    }
  },
};
