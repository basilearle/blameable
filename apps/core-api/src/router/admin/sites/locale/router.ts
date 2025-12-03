import { createRoute, OpenAPIHono, z } from '@hono/zod-openapi';

import {
  createSiteLocale,
  deleteSiteLocale,
  getSiteLocaleTranslations,
  listSiteLocales,
  patchSiteLocaleTranslations,
} from '@blameable/core-data';

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

const listLocalesRoute = createRoute({
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

localeRouter.openapi(listLocalesRoute, async (c) => {
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

// SECTION: create a new locale option

export const CreateLocaleParams = z.object({
  siteId: z.string().openapi({
    param: {
      name: 'siteId',
      in: 'path',
    },
    example: 'afskhfkjs',
  }),
});

export const CreateLocaleBody = z.object({
  locale: z.string(),
});

const createLocaleRoute = createRoute({
  description: 'adds a locale option to a site, for an authenticated user',
  method: 'post',
  path: '/{siteId}/locales',
  request: {
    params: CreateLocaleParams,
    body: {
      content: {
        'application/json': {
          schema: CreateLocaleBody,
        },
      },
    }
  },
  responses: {
    201: {
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

localeRouter.openapi(createLocaleRoute, async (c) => {
  const userId = c.get('userId');
  const { siteId } = c.req.valid('param');
  const { locale } = c.req.valid('json');

  try {
    const sites = await createSiteLocale(db, userId, siteId, locale);

    return c.json(sites, 201);
  } catch {
    console.log('failed to add locale the sites...');
  }

  return c.body(null, 400);
});

// SECTION: get locale tokens

export const LocaleTranslations = z.record(
  z.string(),
  z.string(),
);

export const GetLocaleTranslationQuery = z.object({
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

export const GetLocaleTranslationParams = z.object({
  siteId: z.string().openapi({
    param: {
      name: 'siteId',
      in: 'path',
    },
    example: 'afskhfkjs',
  }),
  localeId: z.string().openapi({
    param: {
      name: 'localeId',
      in: 'path',
    },
    example: 'afskhfkjs',
  }),
});

const getLocaleTranslationsRoute = createRoute({
  description: 'gets the translations for a locale, for a site, for an authenticated user',
  method: 'get',
  path: '/{siteId}/locales/{localeId}',
  request: {
    params: GetLocaleTranslationParams,
    query: GetLocaleTranslationQuery,
  },
  responses: {
    200: {
      description: 'retrieved the site locale translations successfully',
      content: {
        'application/json': {
          schema: LocaleTranslations,
        },
      },
    },
    400: {
      description: 'unable to get the site locale translations',
    },
  },
});

localeRouter.openapi(getLocaleTranslationsRoute, async (c) => {
  const userId = c.get('userId');
  const { siteId, localeId } = c.req.valid('param');
  const { merged = 'true' } = c.req.valid('query');

  try {
    const translationTokens = await getSiteLocaleTranslations(
      db,
      userId,
      siteId,
      localeId,
      merged === 'true'
    );

    return c.json(translationTokens);
  } catch {
    console.log('failed to delete the site locale...');
  }

  return c.body(null, 400);
});


// SECTION: patch a locales tokens

export const PatchLocaleParams = z.object({
  siteId: z.string().openapi({
    param: {
      name: 'siteId',
      in: 'path',
    },
    example: 'afskhfkjs',
  }),
  localeId: z.string().openapi({
    param: {
      name: 'localeId',
      in: 'path',
    },
    example: 'afskhfkjs',
  }),
});

export const PatchLocaleBody = z.record(
  z.string(),
  z.string(),
);

const patchLocaleRoute = createRoute({
  description: 'updates the tokens of  a locale option to a site, for an authenticated user',
  method: 'patch',
  path: '/{siteId}/locales/{localeId}',
  request: {
    params: PatchLocaleParams,
    body: {
      content: {
        'application/json': {
          schema: PatchLocaleBody,
        },
      },
    }
  },
  responses: {
    201: {
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

localeRouter.openapi(patchLocaleRoute, async (c) => {
  const userId = c.get('userId');
  const { siteId, localeId } = c.req.valid('param');
  const translations = c.req.valid('json');

  try {
    const updatedTranslationTokens = await patchSiteLocaleTranslations(
      db,
      userId,
      siteId,
      localeId,
      translations,
    );

    return c.json(updatedTranslationTokens);
  } catch {
    console.log('failed to delete the site locale...');
  }

  return c.body(null, 400);
});

// SECTION: delete a locale

export const DeleteLocaleParams = z.object({
  siteId: z.string().openapi({
    param: {
      name: 'siteId',
      in: 'path',
    },
    example: 'afskhfkjs',
  }),
  localeId: z.string().openapi({
    param: {
      name: 'localeId',
      in: 'path',
    },
    example: 'afskhfkjs',
  }),
});

const deleteLocaleRoute = createRoute({
  description: 'deletes a locale for a site, for an authenticated user',
  method: 'delete',
  path: '/{siteId}/locales/{localeId}',
  request: {
    params: DeleteLocaleParams,
  },
  responses: {
    204: {
      description: 'site locale was deleted successfully',
    },
    400: {
      description: 'unable to delete the site locale',
    },
  },
});

localeRouter.openapi(deleteLocaleRoute, async (c) => {
  const userId = c.get('userId');
  const { siteId, localeId } = c.req.valid('param');

  try {
    await deleteSiteLocale(db, userId, siteId, localeId);

    return c.body(null, 204);
  } catch {
    console.log('failed to delete the site locale...');
  }

  return c.body(null, 400);
});
