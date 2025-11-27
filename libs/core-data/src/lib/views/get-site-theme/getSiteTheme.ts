import { and, eq } from 'drizzle-orm';
import { merge } from 'es-toolkit';

import { Database } from '../../db';
import { siteContentData, sites, usersToSites } from '../../schemas';

export async function getSiteTheme(
  db: Database,
  userId: string,
  siteId: string,
  mergeGlobalTheme = true,
) {
  if (!db || !userId || !siteId) {
    throw new Error('getSiteTheme: missing DB, userId, or siteId');
  }

  const siteThemeQuery = db
    .select({
      theme: siteContentData.theme,
    })
    .from(siteContentData)
    .innerJoin(usersToSites, eq(siteContentData.siteId, usersToSites.siteId))
    .where(
      and(
        eq(usersToSites.userId, userId),
        eq(siteContentData.siteId, siteId),
      ),
    );

  const globalThemeQuery = mergeGlobalTheme
    ? db
        .select({
          theme: siteContentData.theme,
        })
        .from(siteContentData)
        .innerJoin(sites, eq(siteContentData.siteId, sites.id))
        .where(eq(sites.global, true))
    : null;

  const [
    siteThemeResult,
    globalThemeResult,
  ] = await Promise.all([
    siteThemeQuery,
    globalThemeQuery,
  ]);

  if (!siteThemeResult?.[0]) {
    throw new Error('getSiteTheme: site not found or user does not have access');
  }

  if (!mergeGlobalTheme) {
    return siteThemeResult[0] as Record<string, string>;
  }

  if (!globalThemeResult?.[0]) {
    throw new Error('getSiteTheme: unable to retrieve global theme');
  }

  return merge(
    globalThemeResult[0],
    siteThemeResult[0],
  ) as Record<string, string>;
}
