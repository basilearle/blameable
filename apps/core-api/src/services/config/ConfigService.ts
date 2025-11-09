import { eq } from 'drizzle-orm';

import { sitesTable } from '@blameable/core-data';

import { db } from '../../clients/db';

export class ConfigService {

  async getConfigForSite(siteId: string) {
    const siteConfig = await db.query.sitesTable.findFirst({
      where: eq(sitesTable.id, siteId)
    });

    if (!siteConfig) {
      return null;
    }

    return {
      id: siteConfig.id,
      name: siteConfig.name,
      defaultLocale: siteConfig.default_locale,
      availableLocales: siteConfig.configured_locales,
    };
  }

}

export const configService = new ConfigService();
