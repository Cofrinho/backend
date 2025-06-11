import { errorSchemas } from './errorSchemas.js';

export const institutionsSwagger = {
  tags: [
    {
      name: 'Institutions',
      description: 'Endpoints for managing financial institutions',
    },
  ],
  components: {
    schemas: {
      Institution: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          name: { type: 'string', example: 'Banco do Brasil' },
          logo_url: {
            type: 'string',
            format: 'uri',
            example: 'https://example.com/bancos/bb.png',
          },
          created_at: {
            type: 'string',
            format: 'date-time',
            example: '2025-06-01T12:00:00Z',
          },
          updated_at: {
            type: 'string',
            format: 'date-time',
            example: '2025-06-10T12:00:00Z',
          },
        },
        required: ['id', 'name', 'logo_url', 'created_at', 'updated_at'],
      },
      ...errorSchemas,
    },
  },
  paths: {
    '/institutions': {
      get: {
        summary: 'Get all financial institutions',
        tags: ['Institutions'],
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: 'List of institutions',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/Institution' },
                },
              },
            },
          },
          400: {
            description: 'Bad request - institutions not found',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/BadRequestError' },
              },
            },
          },
          401: {
            description: 'Unauthorized - missing or invalid token',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/UnauthorizedError' },
              },
            },
          },
          500: {
            description: 'Internal server error',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/InternalServerError' },
              },
            },
          },
        },
      },
    },
  },
};
