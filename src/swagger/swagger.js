import swaggerUi from 'swagger-ui-express';

import { usersDoc } from './users.swagger.js';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Cofrinho API',
    version: '1.0.0',
    description: 'Documentação da API Cofrinho com Swagger',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Servidor de desenvolvimento',
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
  },
  security: [{ bearerAuth: [] }],
};

const swaggerSpec = {
  ...swaggerDefinition,
  paths: {
    ...usersDoc.paths,
  },
  components: {
    ...swaggerDefinition.components,
    schemas: {
      ...(usersDoc.components?.schemas || {}),
    },
  },
};

export function setupSwagger(app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
