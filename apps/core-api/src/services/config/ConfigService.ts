import { eq } from 'drizzle-orm';

import { sites } from '@blameable/core-data';

import { db } from '../../clients/db';

export class ConfigService {

  async getConfigForSite(siteId: string) {
    const siteConfig = await db.query.sites.findFirst({
      where: eq(sites.id, siteId)
    });

    if (!siteConfig) {
      return null;
    }

    return {
      id: siteConfig.id,
      name: siteConfig.name,
      defaultLocale: siteConfig.defaultLocale,
      // FIXME: this no longer will be coming from the configs, instead show come from the `site_content_date`
      availableLocales: [] as string[],
    };
  }

}

export const configService = new ConfigService();
