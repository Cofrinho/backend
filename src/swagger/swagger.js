import swaggerUi from 'swagger-ui-express';

import { usersSwagger } from './users.swagger.js';
import { authSwagger } from './auth.swagger.js';
import { institutionsSwagger } from './institutions.swagger.js';
import { notificationsSwagger } from './notifications.swagger.js';
import { openFinanceSwagger } from './openFinance.swagger.js';

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
};

const swaggerSpec = {
  ...swaggerDefinition,
  paths: {
    ...usersSwagger.paths,
    ...authSwagger.paths,
    ...institutionsSwagger.paths,
    ...notificationsSwagger.paths,
    ...openFinanceSwagger.paths,
  },
  components: {
    ...swaggerDefinition.components,
    schemas: {
      ...(usersSwagger.components?.schemas || {}),
      ...(authSwagger.components?.schemas || {}),
      ...(institutionsSwagger.components?.schemas || {}),
      ...(notificationsSwagger.components?.schemas || {}),
      ...(openFinanceSwagger.components?.schemas || {}),
    },
  },
};

export function setupSwagger(app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
