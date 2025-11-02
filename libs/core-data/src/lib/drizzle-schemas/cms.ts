import { sql } from 'drizzle-orm';
import { date, pgTable, uuid } from 'drizzle-orm/pg-core';

import { sitesTable } from './sites';

export const cmsTokensTable = pgTable('cms_tokens', {
  id: uuid().primaryKey().defaultRandom(),
  site_id: uuid()
    .notNull()
    .unique()
    .references(() => sitesTable.id, { onDelete: 'cascade' }),
  created_at: date().defaultNow().notNull(),
  updated_at: date().defaultNow().notNull().$onUpdate(() => sql`CURRENT_TIMESTAMP`),
});
