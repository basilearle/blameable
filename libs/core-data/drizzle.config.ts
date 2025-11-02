import 'dotenv/config';

import { defineConfig } from 'drizzle-kit';

const { DATABASE_URL } = process.env;

export default defineConfig({
  out: './drizzle',
  schema: './src/lib/drizzle-schemas',
  dialect: 'postgresql',
  dbCredentials: {
    url: DATABASE_URL as string,
  },
});
