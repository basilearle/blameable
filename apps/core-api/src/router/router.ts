import { swaggerUI } from '@hono/swagger-ui';
import { OpenAPIHono } from '@hono/zod-openapi';

import { bootstrapRouter } from './bootstrap/bootstrap';
import { healthRouter } from './health/router';
import { tokensRouter } from './tokens/tokens';

export const apiRouter = new OpenAPIHono();

apiRouter.route('/bootstrap', bootstrapRouter);
apiRouter.route('/health', healthRouter);
apiRouter.route('/tokens', tokensRouter);

apiRouter.doc('/doc', {
  openapi: '3.0.0',
  info: {
    version: '0.0.1',
    title: 'Blameable Core API',
  },
  servers: [
    {
      url: '/api',
      description: 'API Base Path',
    },
  ],
});

apiRouter.get('/swagger', swaggerUI({ url: '/api/doc' }));
