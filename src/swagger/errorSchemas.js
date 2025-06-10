export const errorSchemas = {
  BadRequestError: {
    type: 'object',
    properties: {
      error: {
        type: 'string',
        example: 'Request validation failed: invalid or missing fields.',
      },
    },
  },
  UnauthorizedError: {
    type: 'object',
    properties: {
      error: { type: 'string', example: 'Invalid or missing JWT token.' },
    },
  },
  NotFoundError: {
    type: 'object',
    properties: {
      error: { type: 'string', example: 'Resource not found.' },
    },
  },
  InternalServerError: {
    type: 'object',
    properties: {
      error: { type: 'string', example: 'Internal server error.' },
    },
  },
};
