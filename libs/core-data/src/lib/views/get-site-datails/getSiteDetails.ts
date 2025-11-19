import { and, eq } from 'drizzle-orm';

import { Database } from '../../db';
import { sites, usersToSites } from '../../schemas';

export type SiteDetails = {
  id: string;
  name: string;
  defaultLocale: string;
  global: boolean;
  isOwner: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export async function getSiteDetails(
  db: Database,
  siteId: string,
  userId: string
): Promise<SiteDetails | null> {
  if (!db || !siteId || !userId) {
    throw new Error('getSiteDetails: missing DB, siteId or userId');
  }

  const result = await db
    .select({
      id: sites.id,
      name: sites.name,
      defaultLocale: sites.defaultLocale,
      global: sites.global,
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
    .limit(1);

  return result?.at(0) ?? null;
}
