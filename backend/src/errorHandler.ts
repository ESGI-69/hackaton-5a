import { ErrorRequestHandler } from 'express';
import { PrismaClientValidationError } from '@prisma/client/runtime/library';
import { ValidationError } from './utils/customErrors';

interface Payload {
  message: string;
  missingFields?: string[];
}

const errorHandler: ErrorRequestHandler = (err, req, res, _next) => {
  if (err instanceof PrismaClientValidationError) {
    const payload: Payload = {
      message: 'Incomplete or invalid request',
    };
    res.status(400).send(payload);
  } else if (err instanceof ValidationError) {
    const payload: Payload = {
      message: err.message,
      missingFields: err.missingFields,
    };
    res.status(400).send(payload);
  } else {
    res.status(400).send({ message: err.message });
  }
};

export default errorHandler;
