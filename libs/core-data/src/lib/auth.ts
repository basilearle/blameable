import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';

import type { Database } from './db';

export const createBetterAuthPool = (
  db: Database,
  allowedOrigins: string[] = [],
) => betterAuth({
  trustedOrigins: allowedOrigins,
  database: drizzleAdapter(db, {
    provider: 'pg',
  }),
  emailAndPassword: {
    enabled: true,
  },
});
