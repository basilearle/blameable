import { and, eq } from 'drizzle-orm';

import { Database } from '../../db';
import { siteContentData, sites, usersToSites } from '../../schemas';

export type SiteTokensTranslations = Record<string, string>;

export type SiteTokensTheme = Record<string, string>;

export type SiteDetails = {
  id: string;
  name: string;
  defaultLocale: string;
  global: boolean;
  isOwner: boolean;
  theme: SiteTokensTheme;
  translations: Record<string, SiteTokensTranslations>;
  createdAt: Date;
  updatedAt: Date;
};

export async function getSiteDetails(
  db: Database,
  siteId: string,
  userId?: string
): Promise<SiteDetails> {
  if (!db || !siteId || !userId) {
    throw new Error('getSiteDetails: missing DB, siteId or userId');
  }

  const results = await db
    .select({
      id: sites.id,
      name: sites.name,
      defaultLocale: sites.defaultLocale,
      global: sites.global,
      isOwner: usersToSites.owner,
      theme: siteContentData.theme,
      translations: siteContentData.translations,
      createdAt: sites.createdAt,
      updatedAt: sites.updatedAt,
    })
    .from(sites)
    .innerJoin(
      usersToSites,
      and(eq(usersToSites.siteId, sites.id), eq(usersToSites.userId, userId))
    )
    .leftJoin(siteContentData, eq(siteContentData.siteId, sites.id))
    .where(eq(sites.id, siteId))

  const result = results?.at(0);

  if (!result) {
    throw new Error('getSiteDetails: site not found');
  }

  // FIXME: this makes me sad...
  return result as SiteDetails;
}
