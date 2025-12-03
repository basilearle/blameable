import { and, eq } from 'drizzle-orm';

import { Database } from '../../db';
import { sites, usersToSites } from '../../schemas';

export type PatchSiteProperties = {
  name: string;
  defaultLocale: string;
}

export async function patchSite(
  db: Database,
  siteId: string,
  userId: string,
  {
    name,
    defaultLocale,
  }: Partial<PatchSiteProperties>,
) {
  if (!db || !siteId || !userId) {
    throw new Error('patchSite: missing DB, siteId, or userId');
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
    throw new Error('patchSite: user is not the owner of this site');
  }

  const updateData: Partial<PatchSiteProperties> = {};

  if (name) updateData.name = name;
  if (defaultLocale) updateData.defaultLocale = defaultLocale;

  if (Object.keys(updateData).length === 0) {
    throw new Error('patchSite: no fields to update');
  }

  const [site] = await db
    .update(sites)
    .set(updateData)
    .where(eq(sites.id, siteId))
    .returning();

  return {
    id: site.id,
    name: site.name,
    defaultLocale: site.defaultLocale,
    isOwner: true,
    createdAt: site.createdAt,
    updatedAt: site.updatedAt,
  };
}
