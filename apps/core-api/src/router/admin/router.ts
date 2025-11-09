import { OpenAPIHono } from '@hono/zod-openapi';

import { adminSitesRouter } from './admin-sites/router';
import { userGuard } from '../../middleware/userGuard';

export const adminRouter = new OpenAPIHono();

// Require authentication for all admin routes
adminRouter.use('*', userGuard);

adminRouter.route('/sites', adminSitesRouter);
