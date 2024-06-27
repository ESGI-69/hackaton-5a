import { NextFunction, Request, Response } from 'express';
import alertService from '../service/alert';
import patientService from '../service/patient';
import checkMandatoryFields from '../utils/checkMandatoryFields';
import { generateAlertByMistral } from '../utils/mistralAi';

export default {
  post: async (req: Request, res: Response, next: NextFunction) => {
    try {
      checkMandatoryFields(['phone', 'name', 'gender', 'birthDate'], req.body);
      const patient = await patientService.create(req.body);
      res.status(201).json(patient);
    } catch (error) {
      next(error);
    }
  },
  get: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const patients = await patientService.getAll();
      res.status(200).json({
        count: patients.length,
        results: patients,
      });
    } catch (error) {
      next(error);
    }
  },
  patch: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id, 10);
      const patient = await patientService.update(id, req.body);
      res.status(200).json(patient);
    } catch (error) {
      next(error);
    }
  },

  postMessage: async (req: Request, res: Response, next: NextFunction) => {
    try {
      checkMandatoryFields(['message'], req.body);
      const id = parseInt(req.params.id, 10);
      const message = await patientService.postMessage(id, req.body.message);

      const aiGeneratedAlertChat = await generateAlertByMistral(
        JSON.stringify(message.conversation.messages),
      );

      const alertInfos = {
        patientId: id,
        score: aiGeneratedAlertChat.score,
        reasons: aiGeneratedAlertChat.reasons,
        summary: aiGeneratedAlertChat.summary,
      };

      if (aiGeneratedAlertChat.score < 100) {
        res.status(201).json(message);
        return;
      }

      const alert = await alertService.checkConversationHasAlert(
        message.conversationId,
      );

      try {
        if (!alert) {
          await alertService.create(alertInfos, message.conversationId);
        } else {
          await alertService.update(alert.id, alertInfos);
        }
        res.status(201).json(message);
      } catch (error) {
        res.status(500).json({ error: 'Error creating alert' });
      }
    } catch (error) {
      next(error);
    }
  },
};
