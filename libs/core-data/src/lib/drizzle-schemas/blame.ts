import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

import { sitesTable } from './sites';

export const blameRegisterTable = pgTable('blame_register', {
  id: uuid().primaryKey().defaultRandom(),
  site_id: uuid()
    .notNull()
    .references(() => sitesTable.id, { onDelete: 'cascade' }),
  ip_address: varchar({ length: 255 }).notNull(),
  created_at: timestamp().defaultNow().notNull(),
});
