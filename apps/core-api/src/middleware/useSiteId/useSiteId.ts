import { createMiddleware } from 'hono/factory';

export type SiteIdVariables = {
  siteId: string;
};

/**
 * Middleware that extracts and validates the X-Site-ID header.
 * Returns 400 if the header is missing.
 * Attaches siteId to the context for downstream handlers.
 */
export const useSiteId = createMiddleware<{ Variables: SiteIdVariables }>(
  async (c, next) => {
    const siteId = c.req.header('X-Site-ID');

    if (!siteId) {
      return c.json(
        {
          error: 'Bad Request',
          message: 'X-Site-ID header is required',
        },
        400
      );
    }

    c.set('siteId', siteId);

    return next();
  }
);