import { createRoute, OpenAPIHono, z } from '@hono/zod-openapi';

import {
  getClientSiteConfig,
  getSiteLocaleTranslations,
} from '@blameable/core-data';

import { db } from '../../../clients/db';
import { SiteIdVariables } from '../../../middleware/useSiteId';
// import { configService } from '../../../services/config/ConfigService';

export const clientBootstrapRouter = new OpenAPIHono<{ Variables: SiteIdVariables }>();

const BootstrapGetParams = z.object({
  locale: z.string().optional().openapi({
    param: {
      name: 'locale',
      in: 'query',
    },
    example: 'en-CA',
  }),
});

const BootstrapGetSchema = z.object({
  availableLocales: z.array(z.string()).openapi({
    example: [
      'en-CA',
      'fr-CA',
      'es-MX',
    ],
  }),
  defaultLocale: z.string().openapi({
    example: 'en-CA',
  }),
  tokens: z.record(z.string(), z.string()),
});

const bootstrapGetRoute = createRoute({
  description: 'retrieves the live configuration and language tokens for the client',
  method: 'get',
  path: '/',
  request: {
    query: BootstrapGetParams,
  },
  responses: {
    200: {
      description: 'successfully retrieved site configurations',
      content: {
        'application/json': {
          schema: BootstrapGetSchema,
        }
      },
    },
    400: {
      description: 'unable to retrieve site retrieved configurations',
    },
  },
});

clientBootstrapRouter.openapi(bootstrapGetRoute, async (c) => {
  const { locale } = c.req.valid('query');
  const siteId = c.get('siteId');

  const config = await getClientSiteConfig(db, siteId);

  if (!config) {
    return c.json(null, 400);
  }

  // if locale is passed, and it's supported, use it, otherwise use the default locale
  const defaultLocale = locale && config.availableLocales.includes(locale)
    ? locale
    : config.defaultLocale;

  // FIXME: either replace the `userId` or replace it with a valid `userId` for the client
  const tokens = await getSiteLocaleTranslations(
    db,
    'cQzCcNobSvfVPnBwv1OGooo0WjcWS7ZJ',
    siteId,
    defaultLocale,
  );

  if (!tokens) {
    return c.json(null, 400);
  }

  return c.json({
    availableLocales: config.availableLocales,
    defaultLocale,
    tokens,
  }, 200);
});
