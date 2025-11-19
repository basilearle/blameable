import { relations } from 'drizzle-orm';

import { users } from './auth';
import { siteBlameRegister } from './blame';
import { siteContentData } from './cms';
import { sites } from './sites';
import { usersToSites } from './userSites';

export const sitesRelations = relations(sites, ({ one, many }) => ({
  siteBlameRegister: one(siteBlameRegister, {
    fields: [sites.id],
    references: [siteBlameRegister.siteId],
  }),
  siteContentData: one(siteContentData, {
    fields: [sites.id],
    references: [siteContentData.siteId],
  }),
  usersToSites: many(usersToSites),
}));

export const siteBlameRegisterRelations = relations(siteBlameRegister, ({ one }) => ({
  site: one(sites, {
    fields: [siteBlameRegister.siteId],
    references: [sites.id],
  }),
}));

export const siteContentDataRelations = relations(siteContentData, ({ one }) => ({
  site: one(sites, {
    fields: [siteContentData.siteId],
    references: [sites.id],
  }),
}));

export const userRelations = relations(users, ({ many }) => ({
  usersToSites: many(usersToSites),
}));

export const usersToSitesRelations = relations(usersToSites, ({ one }) => ({
  user: one(users, {
    fields: [usersToSites.userId],
    references: [users.id],
  }),
  site: one(sites, {
    fields: [usersToSites.siteId],
    references: [sites.id],
  }),
}));
