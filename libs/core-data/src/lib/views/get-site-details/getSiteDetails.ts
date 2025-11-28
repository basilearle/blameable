import { and, eq } from 'drizzle-orm';

import { Database } from '../../db';
import { sites, usersToSites } from '../../schemas';

export type SiteDetails = {
  id: string;
  name: string;
  defaultLocale: string;
  isOwner: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export async function getSiteDetails(
  db: Database,
  siteId: string,
  userId: string
): Promise<SiteDetails> {
  if (!db || !siteId || !userId) {
    throw new Error('getSiteDetails: missing DB, siteId or userId');
  }

  const results = await db
    .select({
      id: sites.id,
      name: sites.name,
      defaultLocale: sites.defaultLocale,
      isOwner: usersToSites.owner,
      createdAt: sites.createdAt,
      updatedAt: sites.updatedAt,
    })
    .from(sites)
    .innerJoin(
      usersToSites,
      and(eq(usersToSites.siteId, sites.id), eq(usersToSites.userId, userId))
    )
    .where(eq(sites.id, siteId))

  const result = results?.at(0);

  if (!result) {
    throw new Error('getSiteDetails: site not found');
  }

  // FIXME: this makes me sad...
  return result as SiteDetails;
}
