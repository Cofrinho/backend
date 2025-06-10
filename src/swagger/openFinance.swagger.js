import { errorSchemas } from './errorSchemas.js';

export const openFinanceSwagger = {
  tags: [
    {
      name: 'OpenFinance',
      description: 'Endpoints for Open Finance integration',
    },
  ],
  components: {
    schemas: {
      OpenFinanceAccountDTO: {
        type: 'object',
        required: [
          'user_id',
          'institution_id',
          'agency',
          'account_number',
          'is_active',
        ],
        properties: {
          user_id: {
            type: 'integer',
            example: 1,
          },
          institution_id: {
            type: 'integer',
            example: 3,
          },
          agency: {
            type: 'string',
            example: '1234',
          },
          account_number: {
            type: 'string',
            example: '00012345-6',
          },
          is_active: {
            type: 'boolean',
            example: true,
          },
          expired_at: {
            type: 'string',
            format: 'date-time',
            example: '2025-12-31T23:59:59Z',
          },
        },
      },

      OpenFinanceAccount: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            example: 1,
          },
          user_id: {
            type: 'integer',
            example: 1,
          },
          institution_id: {
            type: 'integer',
            example: 3,
          },
          agency: {
            type: 'string',
            example: '1234',
          },
          account_number: {
            type: 'string',
            example: '00012345-6',
          },
          is_active: {
            type: 'boolean',
            example: true,
          },
          expired_at: {
            type: 'string',
            format: 'date-time',
            example: '2025-12-31T23:59:59Z',
          },
          created_at: {
            type: 'string',
            format: 'date-time',
            example: '2025-06-10T14:00:00Z',
          },
          updated_at: {
            type: 'string',
            format: 'date-time',
            example: '2025-06-10T14:00:00Z',
          },
        },
      },

      CreateRechargeFundsTransactionDTO: {
        type: 'object',
        required: ['amount', 'user_id', 'institution_id', 'type'],
        properties: {
          amount: {
            type: 'number',
            format: 'decimal',
            example: 100.5,
          },
          user_id: {
            type: 'integer',
            example: 1,
          },
          institution_id: {
            type: 'integer',
            example: 3,
          },
          type: {
            type: 'string',
            example: 'OpenFinance',
          },
        },
      },

      RechargeFundsTransaction: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            format: 'uuid',
            example: '550e8400-e29b-41d4-a716-446655440000',
          },
          amount: {
            type: 'number',
            format: 'decimal',
            example: 100.5,
          },
          user_id: {
            type: 'integer',
            example: 1,
          },
          institution_id: {
            type: 'integer',
            example: 3,
          },
          type: {
            type: 'string',
            example: 'OpenFinance',
          },
          created_at: {
            type: 'string',
            format: 'date-time',
            example: '2025-06-10T14:00:00Z',
          },
          updated_at: {
            type: 'string',
            format: 'date-time',
            example: '2025-06-10T14:00:00Z',
          },
        },
      },

      RechargeRequest: {
        allOf: [
          { $ref: '#/components/schemas/CreateRechargeFundsTransactionDTO' },
        ],
      },

      RechargeResponse: {
        allOf: [{ $ref: '#/components/schemas/RechargeFundsTransaction' }],
      },

      BalanceResponse: {
        type: 'object',
        properties: {
          balance: {
            type: 'number',
            format: 'decimal',
            example: 845.9,
          },
          currency: {
            type: 'string',
            example: 'BRL',
          },
        },
      },

      OpenFinanceBalanceResponse: {
        type: 'object',
        properties: {
          balance: { type: 'number', format: 'decimal', example: 1234.56 },
          logos: {
            type: 'array',
            items: {
              type: 'string',
              format: 'uri',
              example: 'https://logo.com/logo.png',
            },
          },
        },
        required: ['balance', 'logos'],
      },

      OpenFinanceAccountsResponse: {
        type: 'object',
        properties: {
          balanceTotal: { type: 'number', format: 'decimal', example: 1234.56 },
          accounts: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                institutionName: { type: 'string', example: 'Banco XYZ' },
                logo_url: {
                  type: 'string',
                  format: 'uri',
                  example: 'https://logo.com/logo.png',
                },
                account: { type: 'string', example: '00012345-6' },
                agency: { type: 'string', example: '1234' },
                balance: { type: 'number', format: 'decimal', example: 567.89 },
              },
              required: [
                'institutionName',
                'logo_url',
                'account',
                'agency',
                'balance',
              ],
            },
          },
        },
        required: ['balanceTotal', 'accounts'],
      },

      ...errorSchemas,
    },
  },

  paths: {
    '/open-finance/users/{userId}/institutions/{institutionId}/consents': {
      post: {
        summary: 'Grant user consent to institution',
        tags: ['OpenFinance'],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'userId',
            required: true,
            schema: { type: 'integer' },
          },
          {
            in: 'path',
            name: 'institutionId',
            required: true,
            schema: { type: 'integer' },
          },
        ],
        responses: {
          200: {
            description: 'Consent granted successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                      example: 'Consent successfully granted.',
                    },
                  },
                },
              },
            },
          },
          400: {
            description: 'Bad request',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/BadRequestError' },
              },
            },
          },
          401: {
            description: 'Unauthorized',
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

    '/open-finance/consents/{consentId}': {
      patch: {
        summary: 'Update a user consent',
        tags: ['OpenFinance'],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'consentId',
            required: true,
            schema: { type: 'integer' },
          },
        ],
        responses: {
          200: {
            description: 'Consent updated successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string', example: 'Consent updated.' },
                  },
                },
              },
            },
          },
          404: {
            description: 'Consent not found',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/NotFoundError' },
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

      delete: {
        summary: 'Revoke a consent',
        tags: ['OpenFinance'],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'consentId',
            required: true,
            schema: { type: 'integer' },
          },
        ],
        responses: {
          200: { description: 'Consent revoked' },
          404: { description: 'Consent not found' },
          500: { description: 'Internal server error' },
        },
      },

      get: {
        summary: 'Get a consent by ID',
        tags: ['OpenFinance'],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'consentId',
            required: true,
            schema: { type: 'integer' },
          },
        ],
        responses: {
          200: { description: 'Consent found' },
          404: { description: 'Consent not found' },
          500: { description: 'Internal server error' },
        },
      },
    },

    '/open-finance/users/{userId}/consents': {
      get: {
        summary: 'Get all consents of a user',
        tags: ['OpenFinance'],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'userId',
            required: true,
            schema: { type: 'integer' },
          },
        ],
        responses: {
          200: { description: 'List of consents' },
          404: { description: 'User not found' },
          500: { description: 'Internal server error' },
        },
      },
    },

    '/open-finance/users/{userId}/institutions/{institutionId}/balance': {
      get: {
        summary: 'Get user balance from specific institution',
        tags: ['OpenFinance'],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'userId',
            required: true,
            schema: { type: 'integer' },
          },
          {
            in: 'path',
            name: 'institutionId',
            required: true,
            schema: { type: 'integer' },
          },
        ],
        responses: {
          200: {
            description: 'Balance retrieved',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/BalanceResponse' },
              },
            },
          },
          404: { description: 'Not found' },
          500: { description: 'Internal server error' },
        },
      },
    },

    '/open-finance/users/{userId}/institutions/{institutionId}/recharge': {
      post: {
        summary: 'Recharge user account',
        tags: ['OpenFinance'],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'userId',
            required: true,
            schema: { type: 'integer' },
          },
          {
            in: 'path',
            name: 'institutionId',
            required: true,
            schema: { type: 'integer' },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/RechargeRequest' },
            },
          },
        },
        responses: {
          200: {
            description: 'Recharge completed',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/RechargeResponse' },
              },
            },
          },
          400: {
            description: 'Bad request',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/BadRequestError' },
              },
            },
          },
          401: {
            description: 'Unauthorized',
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

    '/open-finance/users/{action}': {
      get: {
        summary: 'Get Open Finance data based on action parameter',
        tags: ['OpenFinance'],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'action',
            required: true,
            schema: { type: 'string', enum: ['balance', 'home'] },
            description: 'The action to fetch specific Open Finance data',
          },
        ],
        responses: {
          200: {
            description: 'Requested Open Finance data',
            content: {
              'application/json': {
                schema: {
                  oneOf: [
                    { $ref: '#/components/schemas/OpenFinanceBalanceResponse' },
                    {
                      $ref: '#/components/schemas/OpenFinanceAccountsResponse',
                    },
                  ],
                  discriminator: {
                    propertyName: 'action',
                    mapping: {
                      balance:
                        '#/components/schemas/OpenFinanceBalanceResponse',
                      home: '#/components/schemas/OpenFinanceAccountsResponse',
                    },
                  },
                },
              },
            },
          },
          400: {
            description: 'Bad request',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/BadRequestError' },
              },
            },
          },
          401: {
            description: 'Unauthorized',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/UnauthorizedError' },
              },
            },
          },
          404: {
            description: 'Not found',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/NotFoundError' },
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
