import { eq } from 'drizzle-orm';

import { Database } from '../../db';
import { sites, usersToSites } from '../../schemas';

export async function listSites(
  db: Database,
  userId: string,
) {
  if (!db || !userId) {
    throw new Error('listSites: missing DB, userId');
  }

  return db
    .select({
      id: sites.id,
      name: sites.name,
      isOwner: usersToSites.owner,
    })
    .from(sites)
    .innerJoin(usersToSites, eq(sites.id, usersToSites.siteId))
    .where(eq(usersToSites.userId, userId));
}
