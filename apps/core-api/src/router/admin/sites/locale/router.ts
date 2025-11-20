import { OpenAPIHono } from '@hono/zod-openapi';

export const localeRouter = new OpenAPIHono();

localeRouter.get('/');

localeRouter.post('/');

localeRouter.get('/:localeId');

localeRouter.patch('/:localeId');

localeRouter.delete('/:localeId');
