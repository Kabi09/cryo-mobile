import { ApiError } from '../utils/apiError.js';

export function validate(schema, source = 'body') {
  return (req, _res, next) => {
    if (!schema) return next();

    const dataToValidate = req[source];
    const { error, value } = schema.validate(dataToValidate, {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      const details = error.details.map((d) => ({
        field: d.path.join('.'),
        message: d.message.replace(/['"]/g, '')
      }));
      return next(ApiError.badRequest('Validation error', details));
    }

    req[source] = value;
    return next();
  };
}
