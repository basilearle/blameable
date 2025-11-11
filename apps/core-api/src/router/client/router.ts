import { OpenAPIHono } from '@hono/zod-openapi';

import { blameRouter } from './blame/router';
import { bootstrapRouter } from './bootstrap/bootstrap';
import { tokensRouter } from './tokens/tokens';

export const clientRouter = new OpenAPIHono();

clientRouter.route('/blame', blameRouter);
clientRouter.route('/bootstrap', bootstrapRouter);
clientRouter.route('/tokens', tokensRouter);
