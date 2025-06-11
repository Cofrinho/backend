import { errorSchemas } from './errorSchemas.js';

export const groupParticipantsSwagger = {
  tags: [
    {
      name: 'GroupParticipants',
      description: 'Gerenciamento de participantes em grupos',
    },
  ],
  paths: {
    '/group-participants': {
      post: {
        tags: ['GroupParticipants'],
        summary: 'Adicionar usuário a um grupo (criação ou reativação)',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/CreateGroupParticipant' },
            },
          },
        },
        responses: {
          201: {
            description: 'Participante adicionado ou reativado com sucesso',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    id: { type: 'integer', example: 10 },
                    group_id: { type: 'integer', example: 1 },
                    user_id: { type: 'integer', example: 2 },
                    active: { type: 'boolean', example: true },
                    created_at: { type: 'string', format: 'date-time' },
                    updated_at: { type: 'string', format: 'date-time' },
                  },
                },
              },
            },
          },
          400: {
            description: 'Participante já ativo ou dados inválidos',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/BadRequestError' },
              },
            },
          },
          404: {
            description: 'Grupo ou usuário não encontrado',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/NotFoundError' },
              },
            },
          },
        },
      },
    },
    '/group-participants/access-code/{accessCode}': {
      post: {
        tags: ['GroupParticipants'],
        summary: 'Adicionar usuário via código de acesso do grupo',
        parameters: [
          {
            name: 'accessCode',
            in: 'path',
            required: true,
            schema: { type: 'string', example: 'GRP1' },
          },
        ],
        responses: {
          201: {
            description: 'Usuário adicionado ao grupo via código',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    id: { type: 'integer', example: 10 },
                    group_id: { type: 'integer', example: 1 },
                    user_id: { type: 'integer', example: 3 },
                    active: { type: 'boolean', example: true },
                  },
                },
              },
            },
          },
          400: {
            description: 'Código inválido ou participante já ativo',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/BadRequestError' },
              },
            },
          },
          404: {
            description: 'Código não encontrado',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/NotFoundError' },
              },
            },
          },
        },
      },
    },
    '/group-participants/group/{groupId}': {
      get: {
        tags: ['GroupParticipants'],
        summary: 'Listar todos os participantes de um grupo',
        parameters: [
          {
            name: 'groupId',
            in: 'path',
            required: true,
            schema: { type: 'integer', example: 1 },
          },
        ],
        responses: {
          200: {
            description: 'Participantes encontrados',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: { type: 'integer' },
                      user_id: { type: 'integer' },
                      group_id: { type: 'integer' },
                      active: { type: 'boolean' },
                    },
                  },
                },
              },
            },
          },
          404: {
            description: 'Grupo não encontrado ou sem participantes ativos',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/NotFoundError' },
              },
            },
          },
        },
      },
    },
    '/group-participants/user/{userId}': {
      get: {
        tags: ['GroupParticipants'],
        summary: 'Listar todos os grupos de um usuário',
        parameters: [
          {
            name: 'userId',
            in: 'path',
            required: true,
            schema: { type: 'integer', example: 2 },
          },
        ],
        responses: {
          200: {
            description: 'Grupos encontrados',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      group_id: { type: 'integer' },
                      group_name: { type: 'string' },
                    },
                  },
                },
              },
            },
          },
          404: {
            description: 'Usuário não participa de nenhum grupo',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/NotFoundError' },
              },
            },
          },
        },
      },
    },
    '/group-participants/{id}': {
      get: {
        tags: ['GroupParticipants'],
        summary: 'Buscar participante pelo ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'integer', example: 5 },
          },
        ],
        responses: {
          200: {
            description: 'Participante encontrado',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    id: { type: 'integer' },
                    user_id: { type: 'integer' },
                    group_id: { type: 'integer' },
                    active: { type: 'boolean' },
                  },
                },
              },
            },
          },
          404: {
            description: 'Participante não encontrado',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/NotFoundError' },
              },
            },
          },
        },
      },
      patch: {
        tags: ['GroupParticipants'],
        summary: 'Atualizar informações de um participante',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'integer' },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/UpdateGroupParticipant' },
            },
          },
        },
        responses: {
          200: {
            description: 'Participante atualizado com sucesso',
          },
          400: {
            description: 'Dados inválidos',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/BadRequestError' },
              },
            },
          },
          404: {
            description: 'Participante não encontrado',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/NotFoundError' },
              },
            },
          },
        },
      },
      delete: {
        tags: ['GroupParticipants'],
        summary: 'Desativar participante pelo ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'integer' },
          },
        ],
        responses: {
          200: { description: 'Participante desativado com sucesso' },
          400: {
            description: 'Participante já está desativado',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/BadRequestError' },
              },
            },
          },
          404: {
            description: 'Participante não encontrado',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/NotFoundError' },
              },
            },
          },
        },
      },
    },
    '/group-participants/group/{groupId}/user/{userId}': {
      delete: {
        tags: ['GroupParticipants'],
        summary: 'Desativar participante com base no grupo e usuário',
        parameters: [
          {
            name: 'groupId',
            in: 'path',
            required: true,
            schema: { type: 'integer' },
          },
          {
            name: 'userId',
            in: 'path',
            required: true,
            schema: { type: 'integer' },
          },
        ],
        responses: {
          200: { description: 'Participante desativado com sucesso' },
          400: {
            description: 'Erro ao desativar participante',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/BadRequestError' },
              },
            },
          },
          404: {
            description: 'Participante não encontrado',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/NotFoundError' },
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      CreateGroupParticipant: {
        type: 'object',
        required: ['group_id', 'user_id'],
        properties: {
          group_id: { type: 'integer', example: 1 },
          user_id: { type: 'integer', example: 2 },
        },
      },
      UpdateGroupParticipant: {
        type: 'object',
        properties: {
          group_id: { type: 'integer', example: 1 },
          user_id: { type: 'integer', example: 2 },
        },
      },
      ...errorSchemas,
    },
  },
};
