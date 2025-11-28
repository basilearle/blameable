import { createRoute, OpenAPIHono, z } from '@hono/zod-openapi';

import { listSiteLocales } from '@blameable/core-data';

import { db } from '../../../../clients/db';
import { UserGuardVariables } from '../../../../middleware/userGuard';

export const localeRouter = new OpenAPIHono<{ Variables: UserGuardVariables }>();

// SECTION: list locales

export const GetLocalesParams = z.object({
  siteId: z.string().openapi({
    param: {
      name: 'siteId',
      in: 'path',
    },
    example: 'afskhfkjs',
  }),
});

export const LocaleList = z.array(
  z.string(),
);

const listSitesRoute = createRoute({
  description: 'lists the locales available for a site, for an authenticated user',
  method: 'get',
  path: '/{siteId}/locales',
  request: {
    params: GetLocalesParams,
  },
  responses: {
    200: {
      description: 'successfully retrieved site locales',
      required: true,
      content: {
        'application/json': {
          schema: LocaleList,
        },
      },
    },
    400: {
      description: 'unable to retrieve the site locales',
    },
  },
});

localeRouter.openapi(listSitesRoute, async (c) => {
  const userId = c.get('userId');
  const { siteId } = c.req.valid('param');

  try {
    const sites = await listSiteLocales(db, userId, siteId);

    return c.json(sites);
  } catch {
    console.log('failed to retrieve the sites...');
  }

  return c.body(null, 400);
});

// SECTION: get locale tokens

// SECTION: create a new locale option

// SECTION: patch a locales tokens

// SECTION: delete a locale

