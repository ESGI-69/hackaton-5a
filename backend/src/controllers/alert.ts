import { NextFunction, Request, Response } from 'express';
import alertService from '../service/alert';
import conversationService from '../service/conversation';

export default {
  getAssigned: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const alerts = await alertService.getAll({
        handledAt: null,
        responsible: { isNot: null },
      });
      res.status(200).json({
        count: alerts.length,
        criticalCount: alerts.filter((a) => a.score >= 5).length,
        mediumCount: alerts.filter((a) => a.score >= 3 && a.score < 5).length,
        lowCount: alerts.filter((a) => a.score < 3).length,
        results: alerts,
      });
    } catch (error) {
      next(error);
    }
  },

  getUnasigned: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const alerts = await alertService.getAll({
        handledAt: null,
        responsible: null,
      });
      res.status(200).json({
        count: alerts.length,
        criticalCount: alerts.filter((a) => a.score >= 5).length,
        mediumCount: alerts.filter((a) => a.score >= 3 && a.score < 5).length,
        lowCount: alerts.filter((a) => a.score < 3).length,
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
      const alert = await alertService.update(id, {
        ...req.body,
        responsible: { connect: { id: req.user.id } },
      });
      res.status(200).json(alert);
    } catch (error) {
      next(error);
    }
  },

  close: async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user)
        throw new Error('You must be logged in to update an Alert');
      const id = parseInt(req.params.id, 10);
      const alert = await alertService.update(id, {
        handledAt: new Date(),
        actions: {
          create: {
            type: 'CLOSED',
            comment: `${req.user.name} a fermé l'alerte avec comme commentaire : ${req.body.message}`,
            user: {
              connect: { id: req.user.id },
            },
          },
        },
      });
      await conversationService.update(alert.conversation.id, {
        closedAt: new Date(),
      });
      res.status(200).json(alert);
    } catch (error) {
      next(error);
    }
  },
};
