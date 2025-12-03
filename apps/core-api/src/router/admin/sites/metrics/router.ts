import { OpenAPIHono } from '@hono/zod-openapi';

export const metricsRouter = new OpenAPIHono();

metricsRouter.get('/');
