import { createRoute, OpenAPIHono } from '@hono/zod-openapi';

import { environment } from '../../../environment';
import { blameService } from '../../../services/blame/BlameService';

export const clientBlameRouter = new OpenAPIHono();

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
  // NOTE: jury is out if this approach really works or not...
  const ipAddress = c.req.header('x-forwarded-for')?.split(',')[0].trim()
    ?? c.req.header('x-real-ip')
    ?? 'unknown';

  await blameService.assignBlame(environment.siteId, ipAddress);

  return c.body(null, 201);
});
