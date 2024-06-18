import { ValidationError } from './customErrors';

export default (fields: string[], params: unknown) => {
  const missingFields = fields.filter((field) => {
    if (typeof params !== 'object' || params === null) {
      return true;
    }
    if (!Object.keys(params).includes(field)) {
      return field;
    }
  });
  if (missingFields.length > 0) {
    throw new ValidationError('Missing params', {
      message: `Missing params: ${missingFields.join(', ')}`,
      missingFields,
    });
  }
};
