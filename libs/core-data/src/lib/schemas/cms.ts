import { json, pgTable, timestamp, uuid } from 'drizzle-orm/pg-core';

import { sites } from './sites';

export const siteContentData = pgTable('site_content_data', {
  id: uuid()
    .primaryKey()
    .defaultRandom(),
  siteId: uuid('site_id')
    .notNull()
    .unique()
    .references(() => sites.id, { onDelete: 'cascade' }),
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
