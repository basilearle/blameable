import { createRoute, OpenAPIHono, z } from '@hono/zod-openapi';
import { eq } from 'drizzle-orm';

import { sitesTable, usersToSitesTable } from '@blameable/core-data';

import { db } from '../../../clients/db';
import { UserGuardVariables } from '../../../middleware/userGuard';

export const adminSitesRouter = new OpenAPIHono<{ Variables: UserGuardVariables }>();

const AdminSiteGetSchema = z.object({
  sites: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      defaultLocale: z.string(),
      configuredLocales: z.array(z.string()),
    })
  ),
});

const adminSitesGetRoute = createRoute({
  description: 'gets the sites assigned to the logged in user',
  method: 'get',
  path: '/',
  responses: {
    200: {
      description: 'found a list of sites',
      content: {
        'application/json': {
          schema: AdminSiteGetSchema,
        }
      },
    },
  },
});

adminSitesRouter.openapi(adminSitesGetRoute, async (c) => {
  const userId = c.get('userId');

  // Query sites associated with the user through the junction table
  const sitesForUser = await db
    .select({
      id: sitesTable.id,
      name: sitesTable.name,
      defaultLocale: sitesTable.default_locale,
      configuredLocales: sitesTable.configured_locales,
    })
    .from(sitesTable)
    .innerJoin(usersToSitesTable, eq(sitesTable.id, usersToSitesTable.site_id))
    .where(eq(usersToSitesTable.user_id, userId));

  return c.json({
    sites: sitesForUser,
  }, 200);
});

