import {
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';

import { user } from './auth';
import { sitesTable } from './sites';

export const usersToSitesTable = pgTable(
  'users_to_sites',
  {
    userId: text('user_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    siteId: uuid('site_id')
      .notNull()
      .references(() => sitesTable.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at')
      .notNull()
      .$onUpdate(() => /* @__PURE__ */ new Date()),
  },
  (table) => [
    primaryKey({ columns: [table.userId, table.siteId] })
  ],
);
