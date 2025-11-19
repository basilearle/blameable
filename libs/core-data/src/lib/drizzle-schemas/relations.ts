import { relations } from 'drizzle-orm';

import { users } from './auth';
import { blameRegisterTable } from './blame';
import { cmsTokensTable } from './cms';
import { sitesTable } from './sites';
import { usersToSitesTable } from './userSites';

export const sitesRelations = relations(sitesTable, ({ one, many }) => ({
  blameRegister: one(blameRegisterTable, {
    fields: [sitesTable.id],
    references: [blameRegisterTable.siteId],
  }),
  cmsTokens: one(cmsTokensTable, {
    fields: [sitesTable.id],
    references: [cmsTokensTable.siteId],
  }),
  usersToSites: many(usersToSitesTable),
}));

export const blameRegisterRelations = relations(blameRegisterTable, ({ one }) => ({
  site: one(sitesTable, {
    fields: [blameRegisterTable.siteId],
    references: [sitesTable.id],
  }),
}));

export const cmsTokensRelations = relations(cmsTokensTable, ({ one }) => ({
  site: one(sitesTable, {
    fields: [cmsTokensTable.siteId],
    references: [sitesTable.id],
  }),
}));

export const userRelations = relations(users, ({ many }) => ({
  usersToSites: many(usersToSitesTable),
}));

export const usersToSitesRelations = relations(usersToSitesTable, ({ one }) => ({
  user: one(users, {
    fields: [usersToSitesTable.userId],
    references: [users.id],
  }),
  site: one(sitesTable, {
    fields: [usersToSitesTable.siteId],
    references: [sitesTable.id],
  }),
}));
