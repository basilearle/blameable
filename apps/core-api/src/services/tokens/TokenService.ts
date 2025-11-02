import { eq } from 'drizzle-orm';

import { cmsTokensTable, type Database } from '@blameable/core-data';

import { CoreDataClientService } from '../core-data-client/CoreDataClientService';

export class TokenService {

  private get db(): Database {
    return CoreDataClientService.getDatabase();
  }

  async getTokensForLocale(siteId: string, locale: string) {
    const tokenEntry = await this.db.query.cmsTokensTable.findFirst({
      where: eq(cmsTokensTable.site_id, siteId)
    });

    if (!tokenEntry) {
      return null;
    }

    const tokensForLocale = (tokenEntry.tokens as Record<string, JSON>)[locale];

    if (!tokensForLocale) {
      return null;
    }

    return tokensForLocale;
  }

}

export const tokenService = new TokenService();
