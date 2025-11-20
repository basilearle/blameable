import { OpenAPIHono } from '@hono/zod-openapi';

import { sitesRouter } from './sites/router';
import { userGuard } from '../../middleware/userGuard';

export const adminRouter = new OpenAPIHono();

adminRouter.use('*', userGuard);

adminRouter.route('/sites', sitesRouter);
