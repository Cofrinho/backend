import { errorSchemas } from './errorSchemas.js';

export const authSwagger = {
  tags: [
    {
      name: 'Auth',
      description: 'Authentication endpoints',
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
      AuthTokenResponse: {
        type: 'object',
        properties: {
          access_token: {
            type: 'string',
            example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
          },
          refresh_token: {
            type: 'string',
            example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
          },
        },
      },
      LoginDTO: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: {
            type: 'string',
            format: 'email',
            example: 'andrei@example.com',
          },
          password: {
            type: 'string',
            format: 'password',
            example: 'minhasenha123',
          },
        },
      },
      Register: {
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
      RefreshToken: {
        type: 'object',
        required: ['refresh_token'],
        properties: {
          refresh_token: {
            type: 'string',
            example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
          },
        },
      },
      VerifyEmail: {
        type: 'object',
        required: ['email', 'code'],
        properties: {
          email: {
            type: 'string',
            format: 'email',
            example: 'andrei@example.com',
          },
          code: {
            type: 'string',
            example: '123456',
          },
        },
      },
      PasswordResetRequest: {
        type: 'object',
        required: ['email'],
        properties: {
          email: {
            type: 'string',
            format: 'email',
            example: 'andrei@example.com',
          },
        },
      },
      PasswordReset: {
        type: 'object',
        required: ['email', 'code', 'new_password'],
        properties: {
          email: {
            type: 'string',
            format: 'email',
            example: 'andrei@example.com',
          },
          new_password: {
            type: 'string',
            format: 'password',
            example: 'novaSenha123',
          },
        },
      },
      ...errorSchemas,
    },
  },

  paths: {
    '/login': {
      post: {
        summary: 'Login with credentials',
        tags: ['Auth'],
        requestBody: {
          description: 'Email and password',
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/LoginDTO' },
            },
          },
        },
        responses: {
          200: {
            description: 'Login successful',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/AuthTokenResponse' },
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

    '/register': {
      post: {
        summary: 'Register a new user',
        tags: ['Auth'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Register' },
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

    '/me': {
      get: {
        summary: 'Get current authenticated user',
        tags: ['Auth'],
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: 'Authenticated user data',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/User',
                },
              },
            },
          },
          401: {
            description: 'Unauthorized - invalid or missing token',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/UnauthorizedError' },
              },
            },
          },
          404: {
            description: 'User not found',
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

    '/refresh': {
      post: {
        summary: 'Refresh access token',
        tags: ['Auth'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/RefreshToken' },
            },
          },
        },
        responses: {
          200: {
            description: 'Tokens refreshed',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/AuthTokenResponse' },
              },
            },
          },
          401: {
            description: 'Invalid refresh token',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/UnauthorizedError' },
              },
            },
          },
          500: {
            description: 'Server error',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/InternalServerError' },
              },
            },
          },
        },
      },
    },

    '/verify-email': {
      post: {
        summary: 'Verify email with code',
        tags: ['Auth'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/VerifyEmailDTO' },
            },
          },
        },
        responses: {
          200: {
            description: 'Email verified successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                      example: 'Email verified successfully.',
                    },
                  },
                },
              },
            },
          },
          400: {
            description: 'Email already verified.',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/BadRequestError' },
              },
            },
          },
          401: {
            description: 'Invalid or expired email verification token.',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/UnauthorizedError' },
              },
            },
          },
          404: {
            description: 'User not found.',
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

    '/forgot-password': {
      post: {
        summary: 'Request password reset code',
        tags: ['Auth'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/PasswordResetRequest' },
            },
          },
        },
        responses: {
          200: {
            description: 'Code sent to email',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                      example: 'Reset code sent to your email.',
                    },
                  },
                },
              },
            },
          },
          500: {
            description: 'Server error',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/InternalServerError' },
              },
            },
          },
        },
      },
    },

    '/validate-reset-code': {
      post: {
        summary: 'Validate password reset code',
        tags: ['Auth'],
        requestBody: {
          description: 'Email and reset code to validate',
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email', 'code'],
                properties: {
                  email: {
                    type: 'string',
                    format: 'email',
                    example: 'andrei@example.com',
                  },
                  code: {
                    type: 'string',
                    example: '123456',
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Reset code validated successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                      example: 'Reset code validated successfully.',
                    },
                  },
                },
              },
            },
          },
          400: {
            description: 'Invalid input or validation failed',
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

    '/reset-password': {
      post: {
        summary: 'Reset password using code',
        tags: ['Auth'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/PasswordReset' },
            },
          },
        },
        responses: {
          200: {
            description: 'Password reset successful',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                      example: 'Password reset successfully.',
                    },
                  },
                },
              },
            },
          },
          400: {
            description: 'User not found.',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/BadRequestError' },
              },
            },
          },
          500: {
            description: 'Server error',
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
