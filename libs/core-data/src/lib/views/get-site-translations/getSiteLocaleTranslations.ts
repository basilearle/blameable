import { and, eq } from 'drizzle-orm';
import { merge } from 'es-toolkit';

import { Database } from '../../db';
import { siteContentData, sites, usersToSites } from '../../schemas';

export async function getSiteLocaleTranslations(
  db: Database,
  userId: string,
  siteId: string,
  locale: string,
  mergeGlobalTranslations = true,
) {
  if (!db || !userId || !siteId || !locale) {
    throw new Error('getSiteLocaleTranslations: missing DB, userId, siteId or locale');
  }

  const siteTranslationsQuery = db
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

  const globalTranslationsQuery = mergeGlobalTranslations
    ? db
        .select({
          translations: siteContentData.translations,
        })
        .from(siteContentData)
        .innerJoin(sites, eq(siteContentData.siteId, sites.id))
        .where(eq(sites.global, true))
    : null;

  const [
    siteTranslationsResult,
    globalTranslationsResult,
  ] = await Promise.all([
    siteTranslationsQuery,
    globalTranslationsQuery,
  ]);

  // FIXME: this makes me sad...
  const siteTranslations = siteTranslationsResult[0]?.translations as Record<string, Record<string, string>>;
  const globalTranslations = globalTranslationsResult?.[0]?.translations as Record<string, Record<string, string>>;

  if (!siteTranslations?.[locale]) {
    throw new Error('getSiteLocaleTranslations: site not found or user does not have access');
  }

  if (!mergeGlobalTranslations) {
    return siteTranslations[locale];
  }

  if (!globalTranslationsResult?.[0].translations) {
    throw new Error('getSiteLocaleTranslations: unable to retrieve global translations');
  }

  return merge(
    globalTranslations[locale] ?? {},
    siteTranslations[locale],
  );
}
