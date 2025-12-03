import { drizzle } from 'drizzle-orm/node-postgres';

import { createBetterAuthPool } from './src';

export const auth = createBetterAuthPool(
  drizzle(process.env.DATABASE_URL)
);
