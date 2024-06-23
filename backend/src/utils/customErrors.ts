interface ValidationErrorOptions {
  message: string;
  missingFields: string[];
}

class ValidationError extends Error {
  missingFields: string[];
  code: string;

  constructor(message: string, options: ValidationErrorOptions) {
    super(message);
    this.name = 'ValidationError';
    this.code = 'CUSTOM-001';
    this.message = options.message;
    this.missingFields = options.missingFields;
  }
}

export { ValidationError };
