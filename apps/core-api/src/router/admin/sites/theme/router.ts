import { createRoute, OpenAPIHono, z } from '@hono/zod-openapi';

import { UserGuardVariables } from '../../../../middleware/userGuard';
import { getTheme, updateTheme } from '../../../../modules';

export const themeRouter = new OpenAPIHono<{ Variables: UserGuardVariables }>();

export const SiteTheme = z.record(z.string(), z.string());

export const GetThemeParams = z.object({
  expand: z.literal('true').optional().openapi({
    param: {
      name: 'expand',
      in: 'query',
    }
  }),
  siteId: z.string().openapi({
    param: {
      name: 'siteId',
      in: 'path',
    }
  }),
});

const getThemeRoute = createRoute({
  description: 'gets the theme for a site by id',
  method: 'get',
  path: '/',
  request: {
    params: GetThemeParams,
  },
  responses: {
    200: {
      description: 'successfully retrieved site theme',
      required: true,
      content: {
        'application/json': {
          schema: SiteTheme,
        },
      },
    },
  },
});

themeRouter.openapi(getThemeRoute, async (c) => {
  const { expand, siteId } = c.req.valid('param');
  const userId = c.get('userId');

  const theme = await getTheme({
    siteId,
    userId,
    mergeWithGlobal: expand === 'true',
  });

  return c.json(theme);
});

// ---

export const PatchThemeParams = z.object({
  siteId: z.string().openapi({
    param: {
      name: 'siteId',
      in: 'path',
    }
  }),
});

const patchThemeRoute = createRoute({
  description: 'patches the theme for a site by id',
  method: 'patch',
  path: '/',
  request: {
    params: PatchThemeParams,
    body: {
      content: {
        'application/json': {
          schema: SiteTheme,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'successfully patched site theme',
      required: true,
      content: {
        'application/json': {
          schema: SiteTheme,
        },
      },
    },
  },
});

themeRouter.openapi(patchThemeRoute, async (c) => {
  const { siteId } = c.req.valid('param');
  const patchThemeBody = c.req.valid('json');
  const userId = c.get('userId');

  const theme = await updateTheme(patchThemeBody, {
    siteId,
    userId,
  });

  return c.json(theme);
});

