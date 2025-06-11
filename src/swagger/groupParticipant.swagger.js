import { errorSchemas } from './errorSchemas.js';

export const groupParticipantSwagger = {
  tags: [
    {
      name: 'Group Participants',
      description: 'Endpoints for managing group participants',
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
      GroupParticipant: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          group_id: { type: 'integer', example: 1 },
          user_id: { type: 'integer', example: 1 },
          deactivated_at: {
            type: 'string',
            format: 'date-time',
            nullable: true,
            example: null,
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
        required: ['id', 'group_id', 'user_id'],
      },
      CreateGroupParticipantDTO: {
        type: 'object',
        required: ['group_id', 'user_id'],
        properties: {
          group_id: { type: 'integer', example: 1 },
          user_id: { type: 'integer', example: 1 },
        },
      },
      UpdateGroupParticipantDTO: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          group_id: { type: 'integer', example: 1, nullable: true },
          user_id: { type: 'integer', example: 1, nullable: true },
        },
        required: ['id'],
      },
      ParticipantResponse: {
        type: 'object',
        properties: {
          message: { type: 'string', example: 'Participant created successfully' },
          participant: { $ref: '#/components/schemas/GroupParticipant' }
        }
      },
      ...errorSchemas,
    },
  },
  paths: {
    '/participants': {
      post: {
        summary: 'Create a new group participant or reactivate an inactive one',
        tags: ['Group Participants'],
        security: [{ bearerAuth: [] }],
        requestBody: {
          description: 'Participant data for creation',
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/CreateGroupParticipantDTO' },
            },
          },
        },
        responses: {
          201: {
            description: 'Participant created or reactivated successfully',
            content: {
              'application/json': {
                schema: {
                  oneOf: [
                    { $ref: '#/components/schemas/GroupParticipant' },
                    {
                      type: 'object',
                      properties: {
                        message: { type: 'string' },
                        participant: { $ref: '#/components/schemas/GroupParticipant' }
                      }
                    }
                  ]
                }
              },
            },
          },
          400: {
            description: 'Bad request (validation error or user already in group)',
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
            description: 'Group or user not found',
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
    '/participants/group/{groupId}': {
      get: {
        summary: 'Get all participants by group ID',
        tags: ['Group Participants'],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'groupId',
            description: 'ID of the group',
            required: true,
            schema: { type: 'integer', example: 1 },
          },
        ],
        responses: {
          200: {
            description: 'List of participants',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/GroupParticipant' },
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
            description: 'No participants found for this group',
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
    '/participants/user/{userId}': {
      get: {
        summary: 'Get all group participations by user ID',
        tags: ['Group Participants'],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'userId',
            description: 'ID of the user',
            required: true,
            schema: { type: 'integer', example: 1 },
          },
        ],
        responses: {
          200: {
            description: 'List of group participations',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/GroupParticipant' },
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
            description: 'User not found or no participations found',
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
    '/participants/{id}': {
      get: {
        summary: 'Get participant by ID',
        tags: ['Group Participants'],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'id',
            description: 'ID of the participant',
            required: true,
            schema: { type: 'integer', example: 1 },
          },
        ],
        responses: {
          200: {
            description: 'Participant details',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/GroupParticipant' },
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
            description: 'Participant not found',
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
      patch: {
        summary: 'Update a participant',
        tags: ['Group Participants'],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'id',
            description: 'ID of the participant to update',
            required: true,
            schema: { type: 'integer', example: 1 },
          },
        ],
        requestBody: {
          description: 'Participant data to update',
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/UpdateGroupParticipantDTO' },
            },
          },
        },
        responses: {
          200: {
            description: 'Participant updated successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                      example: 'Participant updated successfully.',
                    },
                    participant: { $ref: '#/components/schemas/GroupParticipant' },
                  },
                },
              },
            },
          },
          400: {
            description: 'Bad request (validation error or no valid data)',
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
            description: 'Participant not found',
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
        summary: 'Deactivate a participant',
        tags: ['Group Participants'],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'id',
            description: 'ID of the participant to deactivate',
            required: true,
            schema: { type: 'integer', example: 1 },
          },
        ],
        responses: {
          200: {
            description: 'Participant deactivated successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                      example: 'Participant successfully deactivated.',
                    },
                  },
                },
              },
            },
          },
          400: {
            description: 'Bad request (e.g., participant already deactivated)',
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
            description: 'Participant not found',
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
    '/participants/group/{groupId}/user/{userId}': {
      delete: {
        summary: 'Deactivate participant by group and user IDs',
        tags: ['Group Participants'],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'groupId',
            description: 'ID of the group',
            required: true,
            schema: { type: 'integer', example: 1 },
          },
          {
            in: 'path',
            name: 'userId',
            description: 'ID of the user',
            required: true,
            schema: { type: 'integer', example: 1 },
          },
        ],
        responses: {
          200: {
            description: 'Participant deactivated successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                      example: 'Participant successfully deactivated from group.',
                    },
                  },
                },
              },
            },
          },
          400: {
            description: 'Bad request (e.g., participant already deactivated)',
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
            description: 'Participant not found',
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
