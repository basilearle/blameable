import { createRoute, OpenAPIHono } from '@hono/zod-openapi';

import { createBlame } from '@blameable/core-data';

import { db } from '../../../clients/db';
import { SiteIdVariables } from '../../../middleware/useSiteId';

export const clientBlameRouter = new OpenAPIHono<{ Variables: SiteIdVariables }>();

const blamePostRoute = createRoute({
  description: 'assigns blame to the current user',
  method: 'post',
  path: '/',
  responses: {
    201: {
      description: 'successfully assigned blame',
    },
  },
});

clientBlameRouter.openapi(blamePostRoute, async (c) => {
  const siteId = c.get('siteId');

  // NOTE: jury is out if this approach really works or not...
  const ipAddress = c.req.header('x-forwarded-for')?.split(',')[0].trim()
    ?? c.req.header('x-real-ip')
    ?? 'unknown';

  await createBlame(db, siteId, ipAddress);

  return c.body(null, 201);
});
