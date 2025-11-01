import { createRoute, OpenAPIHono } from '@hono/zod-openapi';

import { blameService } from '../../services/blame/BlameService';

export const blameRouter = new OpenAPIHono();

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

blameRouter.openapi(blamePostRoute, (c) => {

  blameService.assignBlame();

  return c.body(null, 201);
});
