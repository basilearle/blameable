import { swaggerUI } from '@hono/swagger-ui';
import { OpenAPIHono, OpenAPIObjectConfigure } from '@hono/zod-openapi';
import { Env } from 'hono';

import { blameRouter } from './blame/router';
import { bootstrapRouter } from './bootstrap/bootstrap';
import { healthRouter } from './health/router';
import { tokensRouter } from './tokens/tokens';

const document: OpenAPIObjectConfigure<Env, '/'> = {
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
};

export const apiRouter = new OpenAPIHono();

apiRouter.route('/blame', blameRouter);
apiRouter.route('/bootstrap', bootstrapRouter);
apiRouter.route('/health', healthRouter);
apiRouter.route('/tokens', tokensRouter);

apiRouter.doc('/doc', document);

apiRouter.get('/swagger', swaggerUI({ url: '/api/doc' }));

export const API_DOC = apiRouter.getOpenAPIDocument(document);
