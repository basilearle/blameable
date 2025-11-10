import { swaggerUI } from '@hono/swagger-ui';
import { OpenAPIHono, OpenAPIObjectConfigure } from '@hono/zod-openapi';
import { Env } from 'hono';
import { cors } from 'hono/cors';

import { environment } from '../environment';
import { adminRouter } from './admin/router';
import { authRouter } from './auth/router';
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

if (environment.corsOrigins) {
  apiRouter.use(cors({
    allowHeaders: ['Content-Type', 'Authorization'],
    credentials: environment.corsCredentials,
    exposeHeaders: ['Content-Length'],
    origin: (origin) => {
      // allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return environment.corsOrigins?.[0] ?? '';

      if (environment.corsOrigins?.includes(origin)) {
        return origin;
      }

      return '';
    },
  }));
}

apiRouter.route('/admin', adminRouter);
apiRouter.route('/auth', authRouter);
apiRouter.route('/blame', blameRouter);
apiRouter.route('/bootstrap', bootstrapRouter);
apiRouter.route('/health', healthRouter);
apiRouter.route('/tokens', tokensRouter);

if (environment.apiSpec) {
  apiRouter.doc('/doc', document);

  apiRouter.get('/swagger', swaggerUI({ url: '/api/doc' }));
}

export const API_DOC = apiRouter.getOpenAPIDocument(document);
