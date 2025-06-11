import { errorSchemas } from './errorSchemas.js';

export const expensesSwagger = {
  tags: [
    {
      name: 'Expenses',
      description: 'Endpoints related to group expenses management',
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
      Expense: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          groupId: { type: 'integer', example: 10 },
          title: { type: 'string', example: 'Dinner with friends' },
          description: {
            type: 'string',
            example: 'Dinner at Italian restaurant',
            nullable: true,
          },
          amount: { type: 'number', format: 'float', example: 150.75 },
          balance: {
            type: 'number',
            format: 'float',
            example: 100.0,
            nullable: true,
          },
          status: { type: 'string', example: 'PENDING' },
          paidAt: {
            type: 'string',
            format: 'date-time',
            example: '2025-06-01T15:30:00Z',
            nullable: true,
          },
          expenseType: { type: 'string', example: 'UTILITY' },
          dueDate: { type: 'string', format: 'date', example: '2025-06-15' },
          createdAt: {
            type: 'string',
            format: 'date-time',
            example: '2025-05-25T10:00:00Z',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            example: '2025-05-26T11:00:00Z',
          },
        },
        required: [
          'id',
          'groupId',
          'title',
          'amount',
          'status',
          'expenseType',
          'dueDate',
          'createdAt',
          'updatedAt',
        ],
      },

      ExpenseMember: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 5 },
          expenseId: { type: 'integer', example: 1 },
          userId: { type: 'integer', example: 42 },
          amount: { type: 'number', format: 'float', example: 50.25 },
          percentagePaid: { type: 'number', format: 'float', example: 33.33 },
          status: { type: 'string', example: 'PENDING' },
          paidAt: {
            type: 'string',
            format: 'date-time',
            example: '2025-06-02T12:00:00Z',
            nullable: true,
          },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
        required: [
          'id',
          'expenseId',
          'userId',
          'amount',
          'percentagePaid',
          'status',
          'createdAt',
          'updatedAt',
        ],
      },

      ExpensePayment: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            format: 'uuid',
            example: 'b3b8f6e1-2b4d-4c34-84b6-123456789abc',
          },
          value: { type: 'number', format: 'float', example: 100.0 },
          expenseId: { type: 'integer', example: 1 },
          userId: { type: 'integer', example: 42 },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
        required: [
          'id',
          'value',
          'expenseId',
          'userId',
          'createdAt',
          'updatedAt',
        ],
      },

      ExpenseTransaction: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            format: 'uuid',
            example: 'e7d0f7b2-9e34-4f87-9d9c-abcdef123456',
          },
          userId: { type: 'integer', example: 42 },
          expenseId: { type: 'integer', example: 1 },
          description: { type: 'string', example: 'Payment made' },
          value: { type: 'number', format: 'float', example: 75.5 },
          type: { type: 'string', example: 'PAYMENT' },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
        required: [
          'id',
          'userId',
          'expenseId',
          'description',
          'value',
          'type',
          'createdAt',
          'updatedAt',
        ],
      },

      ExpenseCreateDTO: {
        type: 'object',
        required: ['groupId', 'title', 'amount', 'expenseType', 'dueDate'],
        properties: {
          groupId: { type: 'integer', example: 10 },
          title: { type: 'string', example: 'Dinner with friends' },
          description: {
            type: 'string',
            example: 'Dinner at Italian restaurant',
            nullable: true,
          },
          amount: { type: 'number', format: 'float', example: 150.75 },
          dueDate: { type: 'string', format: 'date', example: '2025-06-15' },
          members: {
            type: 'array',
            items: {
              type: 'object',
              required: ['userId', 'amount'],
              properties: {
                userId: { type: 'integer', example: 42 },
                amount: { type: 'number', format: 'float', example: 50.25 },
              },
            },
          },
        },
      },

      ExpenseUpdateDTO: {
        type: 'object',
        properties: {
          title: { type: 'string', example: 'Dinner updated' },
          description: {
            type: 'string',
            example: 'Updated description',
            nullable: true,
          },
          amount: { type: 'number', format: 'float', example: 160.0 },
          status: { type: 'string', example: 'PAID' },
          paidAt: {
            type: 'string',
            format: 'date-time',
            example: '2025-06-05T12:00:00Z',
            nullable: true,
          },
          dueDate: { type: 'string', format: 'date', example: '2025-06-20' },
        },
      },

      ...errorSchemas,
    },
  },
  paths: {
    '/groups/{id}/expenses': {
      get: {
        summary: 'Get all expenses for a group',
        tags: ['Expenses'],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: { type: 'integer' },
          },
        ],
        responses: {
          200: {
            description: 'List of expenses',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/Expense' },
                },
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
            description: 'Group not found',
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
      post: {
        summary: 'Create a new expense for a group',
        tags: ['Expenses'],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: { type: 'integer' },
          },
        ],
        requestBody: {
          description: 'Expense creation data',
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ExpenseCreateDTO' },
            },
          },
        },
        responses: {
          201: {
            description: 'Expense created successfully',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Expense' },
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
            description: 'Group not found',
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

    '/groups/{id}/expenses/{expenseId}': {
      get: {
        summary: 'Get details of a specific expense',
        tags: ['Expenses'],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: { type: 'integer' },
          },
          {
            in: 'path',
            name: 'expenseId',
            required: true,
            schema: { type: 'integer' },
          },
        ],
        responses: {
          200: {
            description: 'Expense details',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Expense' },
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
            description: 'Expense not found',
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

    '/groups/{id}/expenses/{expenseId}/members': {
      get: {
        summary: 'Get members involved in an expense',
        tags: ['Expenses'],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: { type: 'integer' },
          },
          {
            in: 'path',
            name: 'expenseId',
            required: true,
            schema: { type: 'integer' },
          },
        ],
        responses: {
          200: {
            description: 'List of members for the expense',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/ExpenseMember' },
                },
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
            description: 'Expense or group not found',
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

    '/groups/expenseMembers/{expenseMemberId}/transactions': {
      post: {
        summary: 'Create a transaction for an expense member',
        tags: ['Expenses'],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'expenseMemberId',
            schema: {
              type: 'integer',
            },
            required: true,
            description: 'ID of the expense member',
          },
        ],
        responses: {
          200: {
            description: 'Transaction created successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ExpenseTransaction',
                },
              },
            },
          },
          400: {
            description: 'Bad request (e.g. insufficient balance)',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/BadRequestError',
                },
              },
            },
          },
          404: {
            description: 'Expense member or expense not found',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/NotFoundError',
                },
              },
            },
          },
          500: {
            description: 'Internal server error',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/InternalServerError',
                },
              },
            },
          },
        },
      },
    },

    '/groups/expenses/{expenseId}/payments': {
      post: {
        summary: 'Make payment for an entire expense',
        tags: ['Expenses'],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'expenseId',
            schema: {
              type: 'integer',
            },
            required: true,
            description: 'ID of the expense to pay',
          },
        ],
        responses: {
          200: {
            description: 'Expense payment processed successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ExpensePayment',
                },
              },
            },
          },
          400: {
            description:
              'Bad request (e.g. expense not found, already paid, insufficient collected amount)',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/BadRequestError',
                },
              },
            },
          },
          500: {
            description: 'Internal server error',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/InternalServerError',
                },
              },
            },
          },
        },
      },
    },
  },
};
