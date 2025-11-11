import { OpenAPIHono } from '@hono/zod-openapi';

import { clientBlameRouter } from './client-blame/router';
import { clientBootstrapRouter } from './client-bootstrap/router';
import { clientTokensRouter } from './client-tokens/router';

export const clientRouter = new OpenAPIHono();

clientRouter.route('/blame', clientBlameRouter);
clientRouter.route('/bootstrap', clientBootstrapRouter);
clientRouter.route('/tokens', clientTokensRouter);
