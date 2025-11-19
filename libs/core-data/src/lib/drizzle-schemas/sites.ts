import { char, pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export const sites = pgTable('sites', {
  id: uuid()
    .primaryKey()
    .defaultRandom(),
  name: varchar({ length: 50, })
    .notNull(),
  defaultLocale: char('default_locale', { length: 5, })
    .notNull(),
  createdAt: timestamp('created_at')
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date()),
});
