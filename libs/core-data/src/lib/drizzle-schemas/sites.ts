import { sql } from 'drizzle-orm';
import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export const sitesTable = pgTable('sites', {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar({ length: 50, }).notNull(),
  created_at: timestamp().defaultNow().notNull(),
  updated_at: timestamp().defaultNow().notNull().$onUpdate(() => sql`CURRENT_TIMESTAMP`),
});
