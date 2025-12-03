import { Database } from '../../db';
import { siteContentData, sites, usersToSites } from '../../schemas';

export type CreateSiteProperties = {
  name: string;
  defaultLocale: string;
}

export async function createSite(
  db: Database,
  userId: string,
  {
    name,
    defaultLocale,
  }: CreateSiteProperties,
) {
  if (!db || !userId || !name || !defaultLocale) {
    throw new Error('createSite: missing DB, userId, name, or defaultLocale');
  }

  const [ site ] = await db.insert(sites).values({
    name,
    defaultLocale,
  }).returning();

  await Promise.all([
    db.insert(usersToSites).values({
      userId,
      siteId: site.id,
      owner: true,
    }),
    db.insert(siteContentData).values({
      siteId: site.id,
    }),
  ]);

  return {
    id: site.id,
    name: site.name,
    defaultLocale: site.defaultLocale,
    isOwner: true,
    createdAt: site.createdAt,
    updatedAt: site.updatedAt,
  };
}
