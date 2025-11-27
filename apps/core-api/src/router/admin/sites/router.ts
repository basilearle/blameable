import { createRoute, OpenAPIHono, z } from '@hono/zod-openapi';

import { createSite } from '@blameable/core-data';

import { db } from '../../../clients/db';
import { UserGuardVariables } from '../../../middleware/userGuard';

export const sitesRouter = new OpenAPIHono<{ Variables: UserGuardVariables }>();

// SECTION: create a site

export const CreateSiteBody = z.object({
  name: z.string(),
  defaultLocale: z.string().optional(),
});

export const SiteDetails = z.object({
  id: z.string(),
  name: z.string(),
  defaultLocale: z.string(),
  isOwner: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

const createSiteRoute = createRoute({
  description: 'creates a new site for an authenticated user',
  method: 'post',
  path: '/',
  request: {
    body: {
      content: {
        'application/json': {
          schema: CreateSiteBody,
        },
      },
    },
  },
  responses: {
    201: {
      description: 'successfully retrieved site theme',
      required: true,
      content: {
        'application/json': {
          schema: SiteDetails,
        },
      },
    },
    400: {
      description: 'unable to create the site',
    },
  },
});

sitesRouter.openapi(createSiteRoute, async (c) => {
  const userId = c.get('userId');
  const {
    name,
    defaultLocale,
  } = c.req.valid('json');

  const site = await createSite(
    db,
    userId,
    {
      name,
      defaultLocale: defaultLocale ?? 'en-CA',
    },
  );

  return c.json(site);
});

sitesRouter.get('/:siteId');

sitesRouter.patch('/:siteId');

sitesRouter.delete('/:siteId');
