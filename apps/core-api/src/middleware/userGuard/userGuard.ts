import { createMiddleware } from 'hono/factory';

import { auth } from '../../clients/auth';

export type UserGuardVariables = {
  userId: string;
  sessionId: string;
};

/**
 * Middleware that validates the user session using better-auth.
 * Returns 401 if the session is missing or expired.
 * Attaches userId and sessionId to the context for downstream handlers.
 */
export const userGuard = createMiddleware<{ Variables: UserGuardVariables }>(
  async (c, next) => {
    const session = await auth.api.getSession({
      headers: c.req.raw.headers,
    });

    if (!session?.session || !session?.user) {
      return c.json(
        {
          error: 'Unauthorized',
          message: 'Valid session required',
        },
        401
      );
    }

    const now = new Date();
    const expiresAt = new Date(session.session.expiresAt);

    if (expiresAt < now) {
      return c.json(
        {
          error: 'Unauthorized',
          message: 'Session expired',
        },
        401
      );
    }

    c.set('userId', session.user.id);
    c.set('sessionId', session.session.id);

    return next();
  }
);
