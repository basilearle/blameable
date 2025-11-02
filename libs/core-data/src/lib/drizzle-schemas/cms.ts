import { date, pgTable, uuid } from 'drizzle-orm/pg-core';

export const cmsTokensTable = pgTable('cms_tokens', {
  id: uuid().primaryKey().defaultRandom(),
  created_at: date().defaultNow().notNull(),
  updated_at: date().defaultNow().notNull(),
});
