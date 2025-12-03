import { and, eq } from 'drizzle-orm';

import { Database } from '../../db';
import { siteContentData, usersToSites } from '../../schemas';

export async function createSiteLocale(
  db: Database,
  userId: string,
  siteId: string,
  locale: string
) {
  if (!db || !userId || !siteId || !locale) {
    throw new Error('createSiteLocale: missing DB, userId, siteId, or locale');
  }

  const [ siteTranslations ] = await db
    .select({
      translations: siteContentData.translations,
    })
    .from(siteContentData)
    .innerJoin(usersToSites, eq(siteContentData.siteId, usersToSites.siteId))
    .where(
      and(
        eq(usersToSites.userId, userId),
        eq(siteContentData.siteId, siteId),
      ),
    );

  if (!siteTranslations.translations) {
    throw new Error('createSiteLocale: site locales not found or user does not have access');
  }

  (siteTranslations.translations as Record<string, unknown>)[locale] = {};

  const [ updatedSiteTranslations ] = await db
    .update(siteContentData)
    .set(siteTranslations)
    .where(
      eq(siteContentData.siteId, siteId)
    )
    .returning();

  if (!updatedSiteTranslations.translations) {
    throw new Error('createSiteLocale: site locales not found after update');
  }

  return Object.keys(updatedSiteTranslations.translations);
}
