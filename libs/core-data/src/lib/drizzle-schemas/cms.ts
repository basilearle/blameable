import { sql } from 'drizzle-orm';
import { json, pgTable, timestamp, uuid } from 'drizzle-orm/pg-core';

import { sitesTable } from './sites';

export const cmsTokensTable = pgTable('cms_tokens', {
  id: uuid().primaryKey().defaultRandom(),
  site_id: uuid()
    .notNull()
    .unique()
    .references(() => sitesTable.id, { onDelete: 'cascade' }),
  tokens: json().default({}).notNull(),
  created_at: timestamp().defaultNow().notNull(),
  updated_at: timestamp().defaultNow().notNull().$onUpdate(() => sql`CURRENT_TIMESTAMP`),
});
