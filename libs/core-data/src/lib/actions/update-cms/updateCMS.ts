import { and, eq } from 'drizzle-orm';

import { Database } from '../../db';
import { siteContentData, usersToSites } from '../../schemas';

export async function updateCMS(
  db: Database,
  siteId: string,
  userId: string,
  tokens: unknown
) {
  if (!db || !siteId || !userId || tokens === undefined) {
    throw new Error('updateCMS: missing DB, siteId, userId or tokens');
  }

  const userAccess = await db
    .select({ siteId: usersToSites.siteId })
    .from(usersToSites)
    .where(and(eq(usersToSites.siteId, siteId), eq(usersToSites.userId, userId)))
    .limit(1);

  if (userAccess.length === 0) {
    throw new Error('User does not have access to this site');
  }

  const results = await db
    .update(siteContentData)
    .set({
      theme: {},
      translations: {},
    })
    .where(eq(siteContentData.siteId, siteId))
    .returning({
      theme: siteContentData.theme,
      translations: siteContentData.translations,
    });

  const result = results.at(0);

  if (!result) {
    throw new Error('Failed to update CMS tokens');
  }

  return results;
}
