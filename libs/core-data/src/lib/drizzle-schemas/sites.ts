import { sql } from 'drizzle-orm';
import { date, pgTable, uuid, varchar } from 'drizzle-orm/pg-core';

export const sitesTable = pgTable('sites', {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar({ length: 50, }).notNull(),
  created_at: date().defaultNow().notNull(),
  updated_at: date().defaultNow().notNull().$onUpdate(() => sql`CURRENT_TIMESTAMP`),
});
