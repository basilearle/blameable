import { sql } from 'drizzle-orm';
import {
  boolean,
  char,
  pgTable,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

export const sites = pgTable(
  'sites',
  {
    id: uuid()
      .primaryKey()
      .defaultRandom(),
    name: varchar({ length: 50 })
      .notNull(),
    defaultLocale: char('default_locale', { length: 5 })
      .notNull(),
    global: boolean('global')
      .notNull()
      .default(false),
    createdAt: timestamp('created_at')
      .notNull()
      .defaultNow(),
    updatedAt: timestamp('updated_at')
      .notNull()
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date()),
  },
  (table) => [
    uniqueIndex('one_global_site').on(table.global).where(sql`${table.global} = true`),
  ],
);
