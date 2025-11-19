import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

import { sitesTable } from './sites';

export const siteBlameRegisterTable = pgTable('site_blame_register', {
  id: uuid()
    .primaryKey()
    .defaultRandom(),
  siteId: uuid('site_id')
    .notNull()
    .references(() => sitesTable.id, { onDelete: 'cascade' }),
  ipAddress: varchar('ip_address', { length: 255 })
    .notNull(),
  createdAt: timestamp('created_at')
    .notNull()
    .defaultNow(),
});
