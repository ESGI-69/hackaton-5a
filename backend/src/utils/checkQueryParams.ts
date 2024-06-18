import { ValidationError } from './customErrors';

/*
** This function checks if there are any forbidden query params
** @params allowedQueryParams: string[] - array of allowed query params
** @params queryParams: object - express query params
** @throws ValidationError - if there are any forbidden query params
** @returns void
*/
export default (allowedQueryParams: string[], queryParams: object) => {
  const errorFields = Object.keys(queryParams).filter((key) => !allowedQueryParams.includes(key));
  const missingFields = allowedQueryParams.filter((field) => !Object.keys(queryParams).includes(field));
  if (errorFields.length > 0) {
    throw new ValidationError('Wrong or forbidden params', {
      message: `Allowed params: ${allowedQueryParams.join(', ')}`,
      missingFields,
    });
  }
};
