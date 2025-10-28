import { createRoute, OpenAPIHono } from '@hono/zod-openapi';

export const healthRouter = new OpenAPIHono();

const healthGetStatusRoute = createRoute({
  description: 'indicates whether the server is running',
  method: 'get',
  path: '/',
  responses: {
    200: {
      description: 'successfully retrieved configurations',
    },
  },
});

healthRouter.openapi(healthGetStatusRoute, (c) => {
  return c.body(null, 200);
});
