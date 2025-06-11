import { errorSchemas } from './errorSchemas.js';

export const groupsSwagger = {
  tags: [
    {
      name: 'Groups',
      description: 'Endpoints for group management',
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
      Group: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          access_code: {
            type: 'string',
            example: 'AB12',
            description: '4-character unique access code',
          },
          name: { type: 'string', example: 'Grupo de Viagem' },
          description: {
            type: 'string',
            nullable: true,
            example: 'Amigos da faculdade',
          },
          image_url: {
            type: 'string',
            nullable: true,
            example: 'https://example.com/image.png',
          },
          group_owner: {
            type: 'integer',
            example: 42,
            description: 'ID do usuário dono do grupo',
          },
          balance: {
            type: 'number',
            format: 'decimal',
            example: 150.75,
            description: 'Saldo atual do grupo',
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
          deactivated_at: {
            type: 'string',
            format: 'date-time',
            nullable: true,
            example: null,
          },
        },
        required: [
          'id',
          'access_code',
          'name',
          'group_owner',
          'balance',
          'created_at',
          'updated_at',
        ],
      },
      CreateGroupDTO: {
        type: 'object',
        required: ['access_code', 'name', 'group_owner'],
        properties: {
          access_code: {
            type: 'string',
            example: 'AB12',
            description: '4-character unique access code',
          },
          name: { type: 'string', example: 'Grupo de Viagem' },
          description: { type: 'string', example: 'Amigos da faculdade' },
          image_url: {
            type: 'string',
            example: 'https://example.com/image.png',
          },
          group_owner: {
            type: 'integer',
            example: 42,
            description: 'ID do usuário dono do grupo',
          },
        },
      },
      UpdateGroupDTO: {
        type: 'object',
        properties: {
          access_code: { type: 'string', example: 'CD34' },
          name: { type: 'string', example: 'Grupo Atualizado' },
          description: { type: 'string', example: 'Nova descrição' },
          image_url: {
            type: 'string',
            example: 'https://example.com/newimage.png',
          },
          group_owner: { type: 'integer', example: 42 },
          balance: { type: 'number', format: 'decimal', example: 200.0 },
        },
      },
      ...errorSchemas,
    },
  },
  paths: {
    '/groups': {
      get: {
        summary: 'Get all groups',
        tags: ['Groups'],
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: 'List of groups',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/Group' },
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
        summary: 'Create a new group',
        tags: ['Groups'],
        security: [{ bearerAuth: [] }],
        requestBody: {
          description: 'Group data for creation',
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/CreateGroupDTO' },
            },
          },
        },
        responses: {
          201: {
            description: 'Group created successfully',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Group' },
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
    '/groups/{id}': {
      get: {
        summary: 'Get group by ID',
        tags: ['Groups'],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'id',
            description: 'Group ID',
            required: true,
            schema: { type: 'integer', example: 1 },
          },
        ],
        responses: {
          200: {
            description: 'Group found',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Group' },
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
      patch: {
        summary: 'Update group',
        tags: ['Groups'],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'id',
            description: 'Group ID to update',
            required: true,
            schema: { type: 'integer', example: 1 },
          },
        ],
        requestBody: {
          description: 'Group data to update',
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/UpdateGroupDTO' },
            },
          },
        },
        responses: {
          200: {
            description: 'Group updated successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                      example: 'Group updated successfully.',
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
      delete: {
        summary: 'Soft delete (deactivate) group',
        tags: ['Groups'],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'id',
            description: 'Group ID to deactivate',
            required: true,
            schema: { type: 'integer', example: 1 },
          },
        ],
        responses: {
          200: {
            description: 'Group successfully deactivated',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                      example: 'Group successfully deactivated.',
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
    '/groups/user/{userId}': {
      get: {
        summary: 'Get groups by user ID',
        tags: ['Groups'],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'userId',
            description: 'User ID to fetch groups associated with',
            required: true,
            schema: { type: 'integer', example: 42 },
          },
        ],
        responses: {
          200: {
            description: 'List of groups for the user',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/Group' },
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
            description: 'No groups found for the user',
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

    '/groups/access/{accessCode}': {
      get: {
        summary: 'Get group by access code',
        tags: ['Groups'],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'accessCode',
            description: 'Unique 4-character access code of the group',
            required: true,
            schema: { type: 'string', example: 'AB12' },
          },
        ],
        responses: {
          200: {
            description: 'Group found by access code',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Group' },
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
            description: 'Group not found with this access code',
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
