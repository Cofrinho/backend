import swaggerUi from 'swagger-ui-express';

import { usersSwagger } from './users.swagger.js';
import { authSwagger } from './auth.swagger.js';
import { institutionsSwagger } from './institutions.swagger.js';
import { notificationsSwagger } from './notifications.swagger.js';
import { openFinanceSwagger } from './openFinance.swagger.js';
import { accountSwagger } from './accounts.swagger.js';
import { groupParticipantsSwagger } from './groupParticipant.swagger.js';
import { groupsSwagger } from './groups.swagger.js';
import { expensesSwagger } from './expenses.swagger.js';

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
    ...accountSwagger.paths,
    ...groupParticipantsSwagger.paths,
  },
  components: {
    ...swaggerDefinition.components,
    schemas: {
      ...(usersSwagger.components?.schemas || {}),
      ...(authSwagger.components?.schemas || {}),
      ...(institutionsSwagger.components?.schemas || {}),
      ...(notificationsSwagger.components?.schemas || {}),
      ...(openFinanceSwagger.components?.schemas || {}),
      ...(accountSwagger.components?.schemas || {}),
      ...(groupParticipantsSwagger.components?.schemas || {}),
      ...(groupsSwagger.components?.schemas || {}),
      ...(expensesSwagger.components?.schemas || {}),
      ...(groupParticipantsSwagger.components?.schemas || {}),
    },
  },
};

export function setupSwagger(app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
