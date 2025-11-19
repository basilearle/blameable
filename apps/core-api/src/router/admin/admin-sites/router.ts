import { createRoute, OpenAPIHono, z } from '@hono/zod-openapi';
import { eq } from 'drizzle-orm';

import { sites, usersToSites } from '@blameable/core-data';

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
      id: sites.id,
      name: sites.name,
      defaultLocale: sites.defaultLocale,
    })
    .from(sites)
    .innerJoin(usersToSites, eq(sites.id, usersToSites.siteId))
    .where(eq(usersToSites.userId, userId));

  return c.json({
    sites: sitesForUser.map((s) => ({
      ...s,
      // FIXME: configured locales now comes from the `site_content_data`
      configuredLocales: [],
    })),
  }, 200);
});

