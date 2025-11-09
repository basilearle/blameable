import { Hono } from 'hono';

import { createBetterAuthPool } from '@blameable/core-data';

import { environment } from '../../environment';
import { CoreDataClientService } from '../../services/core-data-client/CoreDataClientService';

export const authRouter = new Hono();

authRouter.on(['POST', 'GET'], '*', (c) => {
  return createBetterAuthPool(
    CoreDataClientService.getDatabase(),
    // TODO: should probably be updated to it's own independent list, opposed to just the CORS origins
    environment.corsOrigins,
  ).handler(c.req.raw);
});

