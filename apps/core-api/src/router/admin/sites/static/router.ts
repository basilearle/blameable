import { OpenAPIHono } from '@hono/zod-openapi';

export const staticRouter = new OpenAPIHono();

staticRouter.get('/:staticId');

staticRouter.put('/:staticId');

