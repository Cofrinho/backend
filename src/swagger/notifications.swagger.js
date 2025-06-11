import { errorSchemas } from './errorSchemas.js';

export const notificationsSwagger = {
  tags: [
    {
      name: 'Notifications',
      description: 'Endpoints for managing notifications',
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
      Notification: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          user_id: { type: 'integer', example: 1 },
          seen: { type: 'boolean', example: false },
          type: {
            type: 'string',
            enum: ['TRANSACTION', 'RECHARGE', 'PAYMENT', 'EXPENSE'],
            example: 'TRANSACTION',
          },
          reference_id: {
            type: 'string',
            example: '123e4567-e89b-12d3-a456-426614174000',
          },
          created_at: {
            type: 'string',
            format: 'date-time',
            example: '2025-06-10T12:00:00Z',
          },
          updated_at: {
            type: 'string',
            format: 'date-time',
            example: '2025-06-10T12:30:00Z',
          },
        },
        required: [
          'id',
          'user_id',
          'seen',
          'type',
          'reference_id',
          'created_at',
          'updated_at',
        ],
      },
      CreateNotificationInput: {
        type: 'object',
        properties: {
          user_id: { type: 'integer', example: 1 },
          type: {
            type: 'string',
            enum: ['TRANSACTION', 'RECHARGE', 'PAYMENT', 'EXPENSE'],
            example: 'EXPENSE',
          },
          reference_id: {
            type: 'string',
            example: '123e4567-e89b-12d3-a456-426614174000',
            description: 'ID relacionado ao item que gerou a notificação',
          },
        },
        required: ['user_id', 'type', 'reference_id'],
      },

      ...errorSchemas,
    },
  },

  paths: {
    '/notifications/user/{userId}': {
      get: {
        summary: 'Get all notifications for a specific user',
        tags: ['Notifications'],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'userId',
            required: true,
            schema: { type: 'integer', example: 1 },
            description: 'User ID',
          },
        ],
        responses: {
          200: {
            description: 'List of notifications for the user',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/Notification' },
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

    '/notifications': {
      post: {
        summary: 'Create a new notification',
        tags: ['Notifications'],
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/CreateNotificationInput' },
            },
          },
        },
        responses: {
          201: {
            description: 'Notification created successfully',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Notification' },
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

    '/notifications/{id}/mark-seen': {
      patch: {
        summary: 'Mark a notification as seen',
        tags: ['Notifications'],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: { type: 'integer', example: 1 },
            description: 'Notification ID',
          },
        ],
        responses: {
          200: {
            description: 'Notification marked as seen',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                      example: 'Notification marked as seen.',
                    },
                  },
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
            description: 'Notification not found',
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

    '/notifications/{id}': {
      delete: {
        summary: 'Delete a notification by ID',
        tags: ['Notifications'],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            description: 'Notification ID to delete',
            schema: { type: 'integer', example: 1 },
          },
        ],
        responses: {
          200: {
            description: 'Notification deleted successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                      example: 'Notification deleted successfully.',
                    },
                  },
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
          404: {
            description: 'Notification not found',
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
