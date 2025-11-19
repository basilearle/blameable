import { sql } from 'drizzle-orm';
import {
  boolean,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from 'drizzle-orm/pg-core';

import { users } from './auth';
import { sitesTable } from './sites';

export const usersToSitesTable = pgTable(
  'users_to_sites',
  {
    userId: text('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    siteId: uuid('site_id')
      .notNull()
      .references(() => sitesTable.id, { onDelete: 'cascade' }),
    owner: boolean('owner').notNull().default(false),
    createdAt: timestamp('created_at')
      .notNull()
      .$onUpdate(() => /* @__PURE__ */ new Date()),
  },
  (table) => [
    primaryKey({ columns: [table.userId, table.siteId] }),
    uniqueIndex('one_owner_per_site')
      .on(table.siteId)
      .where(sql`${table.owner} = true`),
  ],
);
