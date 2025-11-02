import { sql } from 'drizzle-orm';
import { char, pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export const sitesTable = pgTable('sites', {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar({ length: 50, }).notNull(),
  default_locale: char({ length: 5, }).notNull(),
  configured_locales: char({ length: 5, }).array().default([]),
  created_at: timestamp().defaultNow().notNull(),
  updated_at: timestamp().defaultNow().notNull().$onUpdate(() => sql`CURRENT_TIMESTAMP`),
});
