import { and, eq } from 'drizzle-orm';
import { merge } from 'es-toolkit';

import { Database } from '../../db';
import { siteContentData, sites, usersToSites } from '../../schemas';

export async function getClientSiteLocaleTranslations(
  db: Database,
  siteId: string,
  locale: string,
  mergeGlobalTranslations = true,
) {
  if (!db || !siteId || !locale) {
    throw new Error('getClientSiteLocaleTranslations: missing DB, siteId or locale');
  }

  const siteTranslationsQuery = db
    .select({
      translations: siteContentData.translations,
    })
    .from(siteContentData)
    .innerJoin(usersToSites, eq(siteContentData.siteId, usersToSites.siteId))
    .where(
      and(
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
    throw new Error('getClientSiteLocaleTranslations: site not found');
  }

  if (!mergeGlobalTranslations) {
    return siteTranslations[locale];
  }

  if (!globalTranslationsResult?.[0].translations) {
    throw new Error('getClientSiteLocaleTranslations: unable to retrieve global translations');
  }

  return merge(
    globalTranslations[locale] ?? {},
    siteTranslations[locale],
  );
}
