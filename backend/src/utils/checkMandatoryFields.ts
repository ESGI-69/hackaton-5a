import { ValidationError } from './customErrors';

export default (fields: string[], body: unknown) => {
  const missingFields = fields.filter((field) => {
    if (typeof body !== 'object' || body === null) {
      return true;
    }
    if (!Object.keys(body).includes(field)) {
      return field;
    }
  });
  if (missingFields.length > 0) {
    throw new ValidationError('Missing Fileds', {
      message: `Missing fields: ${missingFields.join(', ')}`,
      missingFields,
    });
  }
};
