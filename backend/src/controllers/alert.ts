import { NextFunction, Request, Response } from 'express';
import actionService from '../service/action';
import alertService from '../service/alert';
import conversationService from '../service/conversation';
import userService from '../service/user';

export default {
  getAssigned: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const alerts = await alertService.getAll({
        handledAt: null,
        responsible: { isNot: null },
      });
      res.status(200).json({
        count: alerts.length,
        criticalCount: alerts.filter((a) => a.score >= 500).length,
        mediumCount: alerts.filter((a) => a.score >= 300 && a.score < 500)
          .length,
        lowCount: alerts.filter((a) => a.score < 300).length,
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
        criticalCount: alerts.filter((a) => a.score >= 500).length,
        mediumCount: alerts.filter((a) => a.score >= 300 && a.score < 500)
          .length,
        lowCount: alerts.filter((a) => a.score < 300).length,
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

  sendDoctorMessage: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      if (!req.user)
        throw new Error('You must be logged in to update an Alert');
      const id = parseInt(req.params.id, 10);
      const alert = await alertService.getById(id);
      if (!alert) throw new Error('Alert not found');
      const conversation = await conversationService.getById(
        alert.conversation.id,
      );
      if (!conversation) throw new Error('Conversation not found');
      const message = await conversationService.postMessage({
        text: req.body.message,
        origin: 'DOCTOR',
        conversation: { connect: { id: conversation.id } },
      });
      await actionService.create(
        {
          comment: `${req.user.name} a envoyé le message suivant : ${message.text}`,
          alertId: alert.id,
          type: 'MESSAGE',
        },
        req.user.id,
      );
      res.status(201).json(message);
    } catch (error) {
      next(error);
    }
  },

  assignDoctor: async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user)
        throw new Error('You must be logged in to update an Alert');
      const id = parseInt(req.params.id, 10);
      const alert = await alertService.getById(id);

      if (!alert) throw new Error('Alert not found');

      const user = await userService.getById(parseInt(req.body.userId));

      await alertService.update(alert.id, {
        responsible: { connect: { id: user?.id } },
      });

      const action = await actionService.create(
        {
          comment: `Docteur ${user?.name} à été assigné à l'alerte`,
          alertId: alert.id,
          type: 'ASSIGNMENT',
        },
        req.user.id,
      );
      res.status(201).json(action);
    } catch (error) {
      next(error);
    }
  },

  call: async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user)
        throw new Error('You must be logged in to update an Alert');
      const id = parseInt(req.params.id, 10);
      await actionService.create(
        {
          type: 'CALL',
          comment: req.body.message,
          alertId: id,
        },
        req.user.id,
      );
      res.status(201).json({ message: 'Call sent' });
    } catch (error) {
      next(error);
    }
  },
};
