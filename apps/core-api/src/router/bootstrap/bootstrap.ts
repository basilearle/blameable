import { createRoute, OpenAPIHono, z } from '@hono/zod-openapi';

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
    params: BootstrapGetParams,
  },
  responses: {
    200: {
      description: 'successfully retrieved configurations',
      content: {
        'application/json': {
          schema: BootstrapGetSchema,
        },
      },
    },
  },
});

bootstrapRouter.openapi(bootstrapGetRoute, (c) => {
  const requestedLocale = c.req.query('locale');

  const defaultLocale = requestedLocale ?? 'en-CA';
  const availableLocales = tokenService.getAvailableLocales();
  const tokens = tokenService.getTokensForLocale(defaultLocale);

  return c.json({
    availableLocales,
    defaultLocale,
    tokens,
  }, 200);
});
