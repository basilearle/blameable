import { eq } from 'drizzle-orm';

import { Database } from '../../db';
import { sites, usersToSites } from '../../schemas';

export type SiteForUser = {
  id: string;
  name: string;
  isOwner: boolean;
};

export async function getSitesForUser(db: Database, userId: string): Promise<SiteForUser[]> {

  if (!db || !userId) {
    throw new Error('getSitesForUser: missing DB or userId');
  }

  return db
    .select({
      id: sites.id,
      name: sites.name,
      isOwner: usersToSites.owner,
    })
    .from(usersToSites)
    .innerJoin(sites, eq(usersToSites.siteId, sites.id))
    .where(eq(usersToSites.userId, userId));
}
