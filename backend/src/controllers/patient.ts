import { NextFunction, Request, Response } from 'express';
import patientService from '../service/patient';
import checkMandatoryFields from '../utils/checkMandatoryFields';

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
};
