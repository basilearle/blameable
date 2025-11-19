import { json, pgTable, timestamp, uuid } from 'drizzle-orm/pg-core';

import { sitesTable } from './sites';

export const cmsTokensTable = pgTable('cms_tokens', {
  id: uuid()
    .primaryKey()
    .defaultRandom(),
  siteId: uuid('site_id')
    .notNull()
    .unique()
    .references(() => sitesTable.id, { onDelete: 'cascade' }),
  tokens: json()
    .notNull()
    .default({}),
  createdAt: timestamp('created_at')
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .defaultNow(),
});
