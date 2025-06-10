export const usersDoc = {
  tags: [
    {
      name: 'Users',
      description: 'Endpoints para gerenciamento de usuários',
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
          name: { type: 'string', example: 'Andrei Albrecht' },
          email: { type: 'string', example: 'andrei@example.com' },
          cpf: { type: 'string', example: '12345678900' },
          birth_date: { type: 'string', format: 'date', example: '1990-01-01' },
          phone: { type: 'string', example: '+5511999999999' },
          avatar_url: {
            type: 'string',
            example: 'http://example.com/avatar.jpg',
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            example: '2025-06-10T15:00:00Z',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            example: '2025-06-10T15:00:00Z',
          },
        },
      },
      CreateUserDTO: {
        type: 'object',
        required: ['name', 'email', 'password', 'cpf', 'birth_date', 'phone'],
        properties: {
          name: { type: 'string', example: 'Andrei Albrecht' },
          email: {
            type: 'string',
            format: 'email',
            example: 'andrei@example.com',
          },
          password: {
            type: 'string',
            format: 'password',
            example: 'strongPassword123',
          },
          cpf: { type: 'string', example: '12345678900' },
          birth_date: { type: 'string', format: 'date', example: '1990-01-01' },
          phone: { type: 'string', example: '+5511999999999' },
        },
      },
      UpdateUserDTO: {
        type: 'object',
        properties: {
          name: { type: 'string', example: 'Andrei Albrecht' },
          email: {
            type: 'string',
            format: 'email',
            example: 'andrei_new@example.com',
          },
          password: {
            type: 'string',
            format: 'password',
            example: 'currentPassword123',
          },
          new_password: {
            type: 'string',
            format: 'password',
            example: 'newStrongPassword123',
          },
          cpf: { type: 'string', example: '12345678900' },
          birth_date: { type: 'string', format: 'date', example: '1990-01-01' },
          phone: { type: 'string', example: '+5511999999999' },
        },
      },
    },
    responses: {
      UnauthorizedError: {
        description: 'Token JWT inválido ou ausente',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                error: { type: 'string', example: 'Unauthorized' },
              },
            },
          },
        },
      },
    },
  },

  paths: {
    '/users': {
      get: {
        summary: 'Retorna todos os usuários',
        tags: ['Users'],
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: 'Lista de usuários',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/User' },
                },
              },
            },
          },
          401: { $ref: '#/components/responses/UnauthorizedError' },
          404: {
            description: 'Nenhum usuário encontrado',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    error: { type: 'string', example: 'No users found.' },
                  },
                },
              },
            },
          },
        },
      },
      post: {
        summary: 'Cria um novo usuário',
        tags: ['Users'],
        security: [{ bearerAuth: [] }],
        requestBody: {
          description: 'Dados do usuário para criação',
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/CreateUserDTO' },
            },
          },
        },
        responses: {
          201: {
            description: 'Usuário criado com sucesso',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                      example: 'User reactivated and updated successfully.',
                    },
                    id: { type: 'integer', example: 1 },
                    name: { type: 'string', example: 'Andrei Albrecht' },
                    email: { type: 'string', example: 'andrei@example.com' },
                  },
                },
              },
            },
          },
          400: {
            description: 'Erro de validação ou dados duplicados',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    error: {
                      type: 'string',
                      example: 'Email already registered.',
                    },
                  },
                },
              },
            },
          },
          401: { $ref: '#/components/responses/UnauthorizedError' },
        },
      },
    },

    '/users/{id}': {
      get: {
        summary: 'Retorna um usuário pelo ID',
        tags: ['Users'],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'id',
            description: 'ID do usuário',
            required: true,
            schema: { type: 'integer', example: 1 },
          },
        ],
        responses: {
          200: {
            description: 'Usuário encontrado',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/User' },
              },
            },
          },
          401: { $ref: '#/components/responses/UnauthorizedError' },
          404: {
            description: 'Usuário não encontrado',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    error: { type: 'string', example: 'No user found.' },
                  },
                },
              },
            },
          },
        },
      },
      patch: {
        summary: 'Atualiza um usuário existente',
        tags: ['Users'],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'id',
            description: 'ID do usuário a ser atualizado',
            required: true,
            schema: { type: 'integer', example: 1 },
          },
        ],
        requestBody: {
          description: 'Dados para atualização do usuário',
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/UpdateUserDTO' },
            },
          },
        },
        responses: {
          200: {
            description: 'Usuário atualizado com sucesso',
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
            description: 'Erro de validação ou dados inválidos',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    error: {
                      type: 'string',
                      example: 'No data provided to update.',
                    },
                  },
                },
              },
            },
          },
          401: { $ref: '#/components/responses/UnauthorizedError' },
          404: {
            description: 'Usuário não encontrado',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    error: { type: 'string', example: 'No user found.' },
                  },
                },
              },
            },
          },
        },
      },
      delete: {
        summary: 'Desativa (soft delete) um usuário',
        tags: ['Users'],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'id',
            description: 'ID do usuário a ser desativado',
            required: true,
            schema: { type: 'integer', example: 1 },
          },
        ],
        responses: {
          200: {
            description: 'Usuário desativado com sucesso',
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
            description: 'Erro ao desativar usuário',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    error: {
                      type: 'string',
                      example: 'Unable to deactivate user.',
                    },
                  },
                },
              },
            },
          },
          401: { $ref: '#/components/responses/UnauthorizedError' },
          404: {
            description: 'Usuário não encontrado',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    error: { type: 'string', example: 'No user found.' },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};
