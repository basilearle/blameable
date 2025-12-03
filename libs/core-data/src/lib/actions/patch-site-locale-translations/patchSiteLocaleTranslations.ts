import { and, eq } from 'drizzle-orm';

import { Database } from '../../db';
import { siteContentData, usersToSites } from '../../schemas';

export async function patchSiteLocaleTranslations(
  db: Database,
  userId: string,
  siteId: string,
  locale: string,
  translations: Record<string, string>,
) {
  if (!db || !userId || !siteId || !locale || !translations) {
    throw new Error('patchSiteLocaleTranslations: missing DB, userId, siteId locale, translations');
  }

  const siteTranslations = await db
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

  const allTranslations = siteTranslations[0]?.translations as Record<string, Record<string, string>>;

  if (!allTranslations[locale]) {
    throw new Error('patchSiteLocaleTranslations: translations for locale not found');
  }

  allTranslations[locale] = {
    ...allTranslations[locale],
    ...translations
  };

  const result = await db
    .update(siteContentData)
    .set({ translations: allTranslations })
    .where(eq(siteContentData.siteId, siteId))
    .returning();

  const updatedTranslations = result[0]?.translations as Record<string, Record<string, string>>;

  if (!updatedTranslations[locale]) {
    throw new Error('patchSiteLocaleTranslations: error occurred while updating translations for locale');
  }

  return updatedTranslations[locale];
}
