import { and, eq } from 'drizzle-orm';

import { Database } from '../../db';
import { sites, usersToSites } from '../../schemas';

export async function deleteSite(
  db: Database,
  userId: string,
  siteId: string,
) {
  if (!db || !userId || !siteId) {
    throw new Error('deleteSite: missing DB, userId or siteId');
  }

  const [ownership] = await db
    .select()
    .from(usersToSites)
    .where(
      and(
        eq(usersToSites.siteId, siteId),
        eq(usersToSites.userId, userId),
        eq(usersToSites.owner, true),
      ),
    );

  if (!ownership) {
    throw new Error('deleteSite: user is not the owner of this site');
  }

  await db.delete(sites).where(
    eq(sites.id, siteId)
  );

  return true;
}
