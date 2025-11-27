import { and, eq } from 'drizzle-orm';
import { merge } from 'es-toolkit';

import { Database } from '../../db';
import { siteContentData, usersToSites } from '../../schemas';

export async function patchTheme(
  db: Database,
  siteId: string,
  userId: string,
  themePatch: Record<string, string>,
) {
  if (!db || !siteId || !userId) {
    throw new Error('patchTheme: missing DB, siteId, or userId');
  }

  const [ result ] = await db
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

  if (!result) {
    throw new Error('patchTheme: site not found or user is not the owner');
  }

  const updatedTheme = merge(
    result.theme as Record<string, string>,
    themePatch,
  );

  await db
    .update(siteContentData)
    .set({ theme: updatedTheme })
    .where(eq(siteContentData.siteId, siteId));

  return updatedTheme;
}
