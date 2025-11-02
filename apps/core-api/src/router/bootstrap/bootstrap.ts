import { createRoute, OpenAPIHono, z } from '@hono/zod-openapi';

import { environment } from '../../environment';
import { configService } from '../../services/config/ConfigService';
import { tokenService } from '../../services/tokens/TokenService';

export const bootstrapRouter = new OpenAPIHono();

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

bootstrapRouter.openapi(bootstrapGetRoute, async (c) => {
  const { locale } = c.req.valid('query');

  const config = await configService.getConfigForSite(environment.siteId);

  if (!config) {
    return c.json(null, 400);
  }

  // if locale is passed, and it's supported, use it, otherwise use the default locale
  const defaultLocale = locale && config.availableLocales.includes(locale)
    ? locale
    : config.defaultLocale;

  const tokens = await tokenService.getTokensForLocale(environment.siteId, defaultLocale);

  if (!tokens) {
    return c.json(null, 400);
  }

  return c.json({
    availableLocales: config.availableLocales,
    defaultLocale,
    tokens,
  }, 200);
});
