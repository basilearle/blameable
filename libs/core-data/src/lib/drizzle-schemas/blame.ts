import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

import { sites } from './sites';

export const siteBlameRegister = pgTable('site_blame_register', {
  id: uuid()
    .primaryKey()
    .defaultRandom(),
  siteId: uuid('site_id')
    .notNull()
    .references(() => sites.id, { onDelete: 'cascade' }),
  ipAddress: varchar('ip_address', { length: 255 })
    .notNull(),
  createdAt: timestamp('created_at')
    .notNull()
    .defaultNow(),
});
