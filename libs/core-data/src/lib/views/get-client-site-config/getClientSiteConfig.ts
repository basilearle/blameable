import { eq } from 'drizzle-orm';

import { Database } from '../../db';
import { siteContentData, sites } from '../../schemas';

export type ClientSiteConfig = {
  id: string;
  name: string;
  defaultLocale: string;
  theme: Record<string, string>;
  availableLocales: string[];
};

export async function getClientSiteConfig(
  db: Database,
  siteId: string,
): Promise<ClientSiteConfig> {
  if (!db || !siteId) {
    throw new Error('getClientSiteConfig: missing DB or siteId');
  }

  const results = await db
    .select({
      id: sites.id,
      name: sites.name,
      defaultLocale: sites.defaultLocale,
      theme: siteContentData.theme,
      translations: siteContentData.translations,
    })
    .from(sites)
    .innerJoin(siteContentData, eq(siteContentData.siteId, sites.id))
    .where(eq(sites.id, siteId));

  const result = results?.at(0);

  if (!result) {
    throw new Error('getClientSiteConfig: site not found');
  }

  return {
    id: result.id,
    name: result.name,
    defaultLocale: result.defaultLocale,
    theme: result.theme as Record<string, string>,
    availableLocales: Object.keys(result.translations as Record<string, unknown>),
  };
}
