import { errorSchemas } from './errorSchemas.js';

export const usersDoc = {
  tags: [
    {
      name: 'Users',
      description: 'Endpoints for user management',
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
      User: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          name: { type: 'string', example: 'José Mourinho' },
          cpf: { type: 'string', example: '123.456.789-00' },
          birth_date: { type: 'string', format: 'date', example: '2002-08-10' },
          email: {
            type: 'string',
            format: 'email',
            example: 'andrei@example.com',
          },
          phone: { type: 'string', example: '(55) 99999-9999' },
          password_hash: {
            type: 'string',
            description: 'Encrypted password',
            example: '$2b$10$...',
          },
          avatar_url: {
            type: 'string',
            format: 'uri',
            nullable: true,
            example: 'https://example.com/avatar.png',
          },
          email_verified_at: {
            type: 'string',
            format: 'date-time',
            nullable: true,
            example: '2025-06-10T14:00:00Z',
          },
          last_login_at: {
            type: 'string',
            format: 'date-time',
            nullable: true,
            example: '2025-06-10T14:00:00Z',
          },
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
        required: [
          'id',
          'name',
          'cpf',
          'birth_date',
          'email',
          'phone',
          'password_hash',
          'created_at',
          'updated_at',
        ],
      },
      CreateUserDTO: {
        type: 'object',
        required: ['name', 'cpf', 'birth_date', 'email', 'phone', 'password'],
        properties: {
          name: { type: 'string', example: 'José Mourinho' },
          cpf: { type: 'string', example: '123.456.789-00' },
          birth_date: { type: 'string', format: 'date', example: '2002-08-10' },
          email: {
            type: 'string',
            format: 'email',
            example: 'andrei@example.com',
          },
          phone: { type: 'string', example: '(55) 99999-9999' },
          password: {
            type: 'string',
            format: 'password',
            example: 'minhasenha123',
          },
        },
      },
      UpdateUserDTO: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          name: { type: 'string', example: 'José Atualizado' },
          cpf: { type: 'string', example: '987.654.321-00' },
          birth_date: { type: 'string', format: 'date', example: '2002-08-10' },
          email: {
            type: 'string',
            format: 'email',
            example: 'jose.updated@example.com',
          },
          phone: { type: 'string', example: '(55) 98888-8888' },
          avatar_url: {
            type: 'string',
            format: 'uri',
            example: 'https://example.com/avatar-novo.png',
          },
          password: {
            type: 'string',
            format: 'password',
            description: 'Current password for authentication',
            example: 'senhaAtual123',
          },
          new_password: {
            type: 'string',
            format: 'password',
            description: 'New password (optional)',
            example: 'novaSenha456',
          },
        },
      },
      ...errorSchemas,
    },
  },

  paths: {
    '/users': {
      get: {
        summary: 'Get all users',
        tags: ['Users'],
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: 'List of users',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/User' },
                },
              },
            },
          },
          404: {
            description: 'No users found',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/NotFoundError' },
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
      post: {
        summary: 'Create a new user',
        tags: ['Users'],
        security: [{ bearerAuth: [] }],
        requestBody: {
          description: 'User data for creation',
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/CreateUserDTO' },
            },
          },
        },
        responses: {
          201: {
            description: 'User created successfully',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/User' },
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

    '/users/{id}': {
      get: {
        summary: 'Get user by ID',
        tags: ['Users'],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'id',
            description: 'User ID',
            required: true,
            schema: { type: 'integer', example: 1 },
          },
        ],
        responses: {
          200: {
            description: 'User found',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/User' },
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
            description: 'Not found - user does not exist',
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
        summary: 'Update existing user',
        tags: ['Users'],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'id',
            description: 'User ID to update',
            required: true,
            schema: { type: 'integer', example: 1 },
          },
        ],
        requestBody: {
          description: 'User data to update',
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/UpdateUserDTO' },
            },
          },
        },
        responses: {
          200: {
            description: 'User updated successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                      example: 'User updated successfully.',
                    },
                  },
                },
              },
            },
          },
          400: {
            description: 'Bad request - validation error or invalid data',
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
          404: {
            description: 'Not found - user does not exist',
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
        summary: 'Soft delete user (deactivate)',
        tags: ['Users'],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'id',
            description: 'User ID to deactivate',
            required: true,
            schema: { type: 'integer', example: 1 },
          },
        ],
        responses: {
          200: {
            description: 'User successfully deactivated',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                      example: 'User successfully deactivated.',
                    },
                  },
                },
              },
            },
          },
          400: {
            description: 'Bad request - failed to deactivate user',
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
          404: {
            description: 'Not found - user does not exist',
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
