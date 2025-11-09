import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';

import type { Database } from './db';

export const createBetterAuthPool = (db: Database) => betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
  }),
});
