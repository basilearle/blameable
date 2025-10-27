import { OpenAPIHono } from '@hono/zod-openapi';

export const apiRouter = new OpenAPIHono();

apiRouter.doc('/doc', {
  openapi: '3.0.0',
  info: {
    version: '0.0.1',
    title: 'Blameable Core API',
  },
});
