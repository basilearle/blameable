import { eq } from 'drizzle-orm';

import { type Database, sitesTable } from '@blameable/core-data';

import { CoreDataClientService } from '../core-data-client/CoreDataClientService';

export class ConfigService {

  private get db(): Database {
    return CoreDataClientService.getDatabase();
  }

  async getConfigForSite(siteId: string) {
    const siteConfig = await this.db.query.sitesTable.findFirst({
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
