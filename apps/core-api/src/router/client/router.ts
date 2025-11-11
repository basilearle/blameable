import { OpenAPIHono } from '@hono/zod-openapi';

import { clientBlameRouter } from './client-blame/router';
import { clientBootstrapRouter } from './client-bootstrap/router';
import { clientTokensRouter } from './client-tokens/router';
import { useSiteId, SiteIdVariables } from '../../middleware/useSiteId';

export const clientRouter = new OpenAPIHono<{ Variables: SiteIdVariables }>();

clientRouter.use('*', useSiteId);

clientRouter.route('/blame', clientBlameRouter);
clientRouter.route('/bootstrap', clientBootstrapRouter);
clientRouter.route('/tokens', clientTokensRouter);
