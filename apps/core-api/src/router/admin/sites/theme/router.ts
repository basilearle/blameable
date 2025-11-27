import { createRoute, OpenAPIHono, z } from '@hono/zod-openapi';

import { getSiteTheme, patchTheme } from '@blameable/core-data';

import { db } from '../../../../clients/db';
import { UserGuardVariables } from '../../../../middleware/userGuard';

export const themeRouter = new OpenAPIHono<{ Variables: UserGuardVariables }>();

// SECTION: get site theme

export const GetSiteThemeParams = z.object({
  id: z.string().openapi({
    param: {
      name: 'id',
      in: 'path',
    },
    example: 'afskhfkjs',
  }),
});

export const GetSiteThemeQuery = z.object({
  merged: z
    .enum([
      'true',
      'false',
    ])
    .optional()
    .openapi({
      param: {
        name: 'merged',
        in: 'query',
      },
    }),
});

export const ThemeDetails = z.record(
  z.string(),
  z.string(),
);

const getSiteThemeRoute = createRoute({
  description: 'gets the theme for a site, for an authenticated user. If merged is true, it will return the merged theme for the site, otherwise it will return the individual theme for the site.',
  method: 'get',
  path: '/{id}/theme',
  request: {
    params: GetSiteThemeParams,
    query: GetSiteThemeQuery,
  },
  responses: {
    200: {
      description: 'successfully retrieved the theme',
      required: true,
      content: {
        'application/json': {
          schema: ThemeDetails,
        },
      },
    },
    400: {
      description: 'unable to retrieve the theme',
    },
  },
});

themeRouter.openapi(getSiteThemeRoute, async (c) => {
  const userId = c.get('userId');
  const { id } = c.req.valid('param');
  const { merged = 'true' } = c.req.valid('query');

  try {
    const theme = await getSiteTheme(
      db,
      userId,
      id,
      merged === 'true'
    );

    return c.json(theme);
  } catch {
    return c.body(null, 400);
  }
});

// SECTION: patch site theme

export const PatchSiteThemeParams = z.object({
  id: z.string().openapi({
    param: {
      name: 'id',
      in: 'path',
    },
    example: 'afskhfkjs',
  }),
});

const patchSiteThemeRoute = createRoute({
  description: 'patch the theme for a site, for an authenticated user.',
  method: 'patch',
  path: '/{id}/theme',
  request: {
    params: PatchSiteThemeParams,
    body: {
      content: {
        'application/json': {
          schema: ThemeDetails,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'successfully retrieved the theme',
      required: true,
      content: {
        'application/json': {
          schema: ThemeDetails,
        },
      },
    },
    400: {
      description: 'unable to retrieve the theme',
    },
  },
});

themeRouter.openapi(patchSiteThemeRoute, async (c) => {
  const userId = c.get('userId');
  const { id } = c.req.valid('param');
  const body = c.req.valid('json');

  try {
    const theme = await patchTheme(
      db,
      id,
      userId,
      body
    );

    return c.json(theme);
  } catch {
    return c.body(null, 400);
  }
});

