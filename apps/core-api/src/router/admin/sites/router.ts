import { createRoute, OpenAPIHono, z } from '@hono/zod-openapi';

import {
  createSite,
  deleteSite,
  getSiteDetails,
  listSites,
  patchSite,
} from '@blameable/core-data';

import { localeRouter } from './locale/router';
import { themeRouter } from './theme/router';
import { db } from '../../../clients/db';
import { UserGuardVariables } from '../../../middleware/userGuard';

export const sitesRouter = new OpenAPIHono<{ Variables: UserGuardVariables }>();

// SECTION: child routers

// NOTE: the child routes start at `/` since the will also need access to the `{siteId}` param,
// which cannot be accessed in the child router if defined here.
sitesRouter.route('/', localeRouter);
sitesRouter.route('/', themeRouter);

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
      description: 'successfully created the site',
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

// SECTION: get site details

export const GetSiteParams = z.object({
  siteId: z.string().openapi({
    param: {
      name: 'siteId',
      in: 'path',
    },
    example: 'afskhfkjs',
  }),
});

const getSiteRoute = createRoute({
  description: 'gets a site details for an authenticated user',
  method: 'get',
  path: '/{siteId}',
  request: {
    params: GetSiteParams,
  },
  responses: {
    200: {
      description: 'successfully retrieved the site',
      required: true,
      content: {
        'application/json': {
          schema: SiteDetails,
        },
      },
    },
    400: {
      description: 'unable to retrieve the site',
    },
  },
});

sitesRouter.openapi(getSiteRoute, async (c) => {
  const userId = c.get('userId');
  const { siteId } = c.req.valid('param');

  try {
    const site = await getSiteDetails(db, siteId, userId);

    return c.json(site, 200);
  } catch {
    console.log('failed to get the site...');
  }

  return c.body(null, 400);
});

// SECTION: patch a site

export const PatchSiteParams = z.object({
  siteId: z.string().openapi({
    param: {
      name: 'siteId',
      in: 'path',
    },
    example: 'afskhfkjs',
  }),
});

export const PatchSiteBody = z.object({
  name: z.string().optional(),
  defaultLocale: z.string().optional(),
});

const patchSiteRoute = createRoute({
  description: 'patch a site for an authenticated user',
  method: 'patch',
  path: '/{siteId}',
  request: {
    params: PatchSiteParams,
    body: {
      content: {
        'application/json': {
          schema: PatchSiteBody,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'site was deleted successfully',
      content: {
        'application/json': {
          schema: SiteDetails,
        },
      },
    },
    400: {
      description: 'unable to delete the site',
    },
  },
});

sitesRouter.openapi(patchSiteRoute, async (c) => {
  const userId = c.get('userId');
  const { siteId } = c.req.valid('param');
  const body = c.req.valid('json');

  try {
    const patchedSite = await patchSite(db, siteId, userId, body);

    return c.json(patchedSite);
  } catch {
    console.log('failed to patch the site...');
  }

  return c.body(null, 400);
});

// SECTION: delete a site

export const DeleteSiteParams = z.object({
  siteId: z.string().openapi({
    param: {
      name: 'siteId',
      in: 'path',
    },
    example: 'afskhfkjs',
  }),
});

const deleteSiteRoute = createRoute({
  description: 'deletes a site for an authenticated user',
  method: 'delete',
  path: '/{siteId}',
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
  const { siteId } = c.req.valid('param');

  try {
    await deleteSite(db, userId, siteId);

    return c.body(null, 204);
  } catch {
    console.log('failed to delete the site...');
  }

  return c.body(null, 400);
});
