import { Hono } from 'hono';

import { createBetterAuthPool } from '@blameable/core-data';

import { CoreDataClientService } from '../../services/core-data-client/CoreDataClientService';

export const authRouter = new Hono();

authRouter.on(['POST', 'GET'], '*', (c) => {
  return createBetterAuthPool(CoreDataClientService.getDatabase()).handler(c.req.raw);
});

