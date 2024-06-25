import { NextFunction, Request, Response } from 'express';
import alertService from '../service/alert';
import checkMandatoryFields from '../utils/checkMandatoryFields';

export default {
  post: async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user)
        throw new Error('You must be logged in to create a recipe');
      checkMandatoryFields(
        ['score', 'reasons', 'summary', 'patientId'],
        req.body,
      );

      const alert = await alertService.create(req.body, req.user.id);
      res.status(201).json(alert);
    } catch (error) {
      next(error);
    }
  },

  get: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const alerts = await alertService.getAll();
      res.status(200).json({
        count: alerts.length,
        results: alerts,
      });
    } catch (error) {
      next(error);
    }
  },

  getById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id, 10);
      const alert = await alertService.getById(id);
      res.status(200).json(alert);
    } catch (error) {
      next(error);
    }
  },

  patch: async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user)
        throw new Error('You must be logged in to update an Alert');
      const id = parseInt(req.params.id, 10);
      const alert = await alertService.update(id, req.body, req.user.id);
      res.status(200).json(alert);
    } catch (error) {
      next(error);
    }
  },
};