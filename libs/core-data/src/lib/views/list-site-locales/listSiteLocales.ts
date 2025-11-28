import { and, eq } from 'drizzle-orm';

import { Database } from '../../db';
import { siteContentData, usersToSites } from '../../schemas';

export async function listSiteLocales(
  db: Database,
  userId: string,
  siteId: string,
) {
  if (!db || !userId || !siteId) {
    throw new Error('listSiteLocales: missing DB, userId, siteId');
  }

  const siteTranslationData = await db
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

  if (!siteTranslationData?.[0].translations) {
    throw new Error('listSiteLocales: site not found or user does not have access');
  }

  return Object.keys(siteTranslationData[0].translations);
}
