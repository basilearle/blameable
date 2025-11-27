import { createRoute, OpenAPIHono, z } from '@hono/zod-openapi';

import { createSite, deleteSite, listSites } from '@blameable/core-data';

import { db } from '../../../clients/db';
import { UserGuardVariables } from '../../../middleware/userGuard';

export const sitesRouter = new OpenAPIHono<{ Variables: UserGuardVariables }>();

// SECTION: list sites

export const SiteList = z.array(
  z.object({
    id: z.string(),
    name: z.string(),
    isOwner: z.boolean(),
  }),
);

const listSitesRoute = createRoute({
  description: 'lists the sites for an authenticated user',
  method: 'get',
  path: '/',
  responses: {
    200: {
      description: 'successfully retrieved site theme',
      required: true,
      content: {
        'application/json': {
          schema: SiteList,
        },
      },
    },
    400: {
      description: 'unable to retrieve the sites',
    },
  },
});

sitesRouter.openapi(listSitesRoute, async (c) => {
  const userId = c.get('userId');

  try {
    const sites = await listSites(db, userId);

    return c.json(sites);
  } catch {
    console.log('failed to retrieve the sites...');
  }

  return c.body(null, 400);
});

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

  try {
    const site = await createSite(
      db,
      userId,
      {
        name,
        defaultLocale: defaultLocale ?? 'en-CA',
      },
    );

    return c.json(site);
  } catch {
    console.log('failed to create the site...');
  }

  return c.body(null, 400);
});

sitesRouter.get('/:siteId');

sitesRouter.patch('/:siteId');

// SECTION: delete a site

export const DeleteSiteParams = z.object({
  id: z.string().openapi({
    param: {
      name: 'id',
      in: 'path',
    },
    example: 'afskhfkjs',
  }),
});

const deleteSiteRoute = createRoute({
  description: 'deletes a site for an authenticated user',
  method: 'delete',
  path: '/{id}',
  request: {
    params: DeleteSiteParams,
  },
  responses: {
    204: {
      description: 'site was deleted successfully',
    },
    400: {
      description: 'unable to delete the site',
    },
  },
});

sitesRouter.openapi(deleteSiteRoute, async (c) => {
  const userId = c.get('userId');
  const { id } = c.req.valid('param');

  try {
    await deleteSite(db, userId, id);

    return c.body(null, 204);
  } catch {
    console.log('failed to delete the site...');
  }

  return c.body(null, 400);
});
