import { createRoute, OpenAPIHono, z } from '@hono/zod-openapi';

import { tokenService } from '../../services/tokens/TokenService';

export const tokensRouter = new OpenAPIHono();

const TokensGetParams = z.object({
  locale: z.string().openapi({
    param: {
      name: 'locale',
      in: 'path',
    },
    example: 'en-CA',
  }),
});

const TokensGetSchema = z.object({
  tokens: z.record(z.string(), z.string()),
});

const tokensGetRoute = createRoute({
  description: 'retrieves the language tokens for a given locale',
  method: 'get',
  path: '/:locale',
  request: {
    params: TokensGetParams,
  },
  responses: {
    200: {
      description: 'successfully retrieved tokens',
      content: {
        'application/json': {
          schema: TokensGetSchema,
        },
      },
    },
  },
});

tokensRouter.openapi(tokensGetRoute, (c) => {
  const { locale } = c.req.valid('param');

  const tokens = tokenService.getTokensForLocale(locale);

  return c.json({
    tokens,
  }, 200);
});
