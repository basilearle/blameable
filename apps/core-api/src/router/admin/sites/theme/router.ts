import { OpenAPIHono } from '@hono/zod-openapi';

import { UserGuardVariables } from '../../../../middleware/userGuard';

export const themeRouter = new OpenAPIHono<{ Variables: UserGuardVariables }>();

