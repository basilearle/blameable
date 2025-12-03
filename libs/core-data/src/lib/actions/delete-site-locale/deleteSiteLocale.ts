import { and, eq } from 'drizzle-orm';

import { Database } from '../../db';
import { siteContentData, usersToSites } from '../../schemas';

export async function deleteSiteLocale(
  db: Database,
  userId: string,
  siteId: string,
  locale: string
) {
  if (!db || !userId || !siteId || !locale) {
    throw new Error('deleteSiteLocale: missing DB, userId, siteId, or locale');
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
    throw new Error('deleteSiteLocale: site locales not found or user does not have access');
  }

  delete (siteTranslations.translations as Record<string, unknown>)[locale];

  await db
    .update(siteContentData)
    .set(siteTranslations)
    .where(
      eq(siteContentData.siteId, siteId)
    );

  return true;
}
