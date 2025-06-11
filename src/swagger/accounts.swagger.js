import { errorSchemas } from './errorSchemas.js';

export const accountSwagger = {
  tags: [
    {
      name: 'Accounts',
      description: 'Endpoints for account management and transactions',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    schemas: {
      Account: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            format: 'uuid',
            example: '550e8400-e29b-41d4-a716-446655440000',
          },
          user_id: {
            type: 'integer',
            example: 1,
          },
          balance: {
            type: 'number',
            format: 'decimal',
            example: 1500.75,
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
        required: ['id', 'user_id', 'balance', 'created_at', 'updated_at'],
      },
      Transaction: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 123 },
          value: { type: 'number', example: 50.0 },
          date: {
            type: 'string',
            format: 'date-time',
            example: '2025-06-10T14:00:00Z',
          },
          type: {
            type: 'string',
            enum: ['recharge', 'payment', 'transaction'],
            example: 'recharge',
          },
          title: {
            type: 'string',
            nullable: true,
            example: 'Recarga Cofrinho',
          },
          name: { type: 'string', nullable: true, example: 'Conta de Luz' },
          group: { type: 'string', nullable: true, example: 'Grupo 5' },
        },
      },
      AccountInfoResponse: {
        type: 'object',
        properties: {
          balance: { type: 'number', format: 'decimal', example: 1500.75 },
          notifications: { type: 'integer', example: 3 },
          transactions: {
            type: 'array',
            items: { $ref: '#/components/schemas/Transaction' },
          },
        },
      },
      BalanceResponse: {
        type: 'object',
        properties: {
          balance: { type: 'number', format: 'decimal', example: 1500.75 },
        },
      },
      MessageResponse: {
        type: 'object',
        properties: {
          message: { type: 'string', example: 'Operation successful.' },
        },
      },
      ...errorSchemas,
    },
  },

  paths: {
    '/accounts/users/balance': {
      get: {
        summary: 'Get the balance of the authenticated user',
        tags: ['Accounts'],
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: 'Current balance',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/BalanceResponse' },
              },
            },
          },
          400: {
            description: 'User not found',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/BadRequestError' },
              },
            },
          },
          401: {
            description: 'Unauthorized - authentication required',
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

    '/accounts/home': {
      get: {
        summary:
          'Get account info including balance, notifications and recent transactions',
        tags: ['Accounts'],
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: 'Account info',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/AccountInfoResponse' },
              },
            },
          },
          404: {
            description: 'User or account not found',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/NotFoundError' },
              },
            },
          },
          401: {
            description: 'Unauthorized - authentication required',
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

    '/accounts/users/transactions': {
      get: {
        summary: 'Get all transactions for the authenticated user',
        tags: ['Accounts'],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: 'query',
            name: 'limit',
            schema: { type: 'integer', example: 4 },
            description: 'Limit number of transactions returned',
            required: false,
          },
        ],
        responses: {
          200: {
            description: 'List of transactions',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/Transaction' },
                },
              },
            },
          },
          401: {
            description: 'Unauthorized - authentication required',
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
