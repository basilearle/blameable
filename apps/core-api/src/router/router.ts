import { OpenAPIHono } from '@hono/zod-openapi';

import { bootstrapRouter } from './bootstrap/bootstrap';
import { healthRouter } from './health/router';

export const apiRouter = new OpenAPIHono();

apiRouter.route('/bootstrap', bootstrapRouter);
apiRouter.route('/health', healthRouter);

apiRouter.doc('/doc', {
  openapi: '3.0.0',
  info: {
    version: '0.0.1',
    title: 'Blameable Core API',
  },
});
