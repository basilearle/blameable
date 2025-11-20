import { OpenAPIHono } from '@hono/zod-openapi';

export const themeRouter = new OpenAPIHono();

themeRouter.get('/:staticId');

themeRouter.patch('/:staticId');

