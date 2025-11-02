import { relations } from 'drizzle-orm';

import { blameRegisterTable } from './blame';
import { cmsTokensTable } from './cms';
import { sitesTable } from './sites';

export const sitesRelations = relations(sitesTable, ({ one }) => ({
  blameRegister: one(blameRegisterTable, {
    fields: [sitesTable.id],
    references: [blameRegisterTable.site_id],
  }),
  cmsTokens: one(cmsTokensTable, {
    fields: [sitesTable.id],
    references: [cmsTokensTable.site_id],
  }),
}));

export const blameRegisterRelations = relations(blameRegisterTable, ({ one }) => ({
  site: one(sitesTable, {
    fields: [blameRegisterTable.site_id],
    references: [sitesTable.id],
  }),
}));

export const cmsTokensRelations = relations(cmsTokensTable, ({ one }) => ({
  site: one(sitesTable, {
    fields: [cmsTokensTable.site_id],
    references: [sitesTable.id],
  }),
}));
