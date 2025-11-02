import { date, pgTable, uuid, varchar } from 'drizzle-orm/pg-core';

export const blameRegisterTable = pgTable('blame_register', {
  id: uuid().primaryKey().defaultRandom(),
  ip_address: varchar({ length: 255 }).notNull(),
  created_at: date().defaultNow().notNull(),
});
