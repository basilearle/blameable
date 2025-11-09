import { eq } from 'drizzle-orm';

import { cmsTokensTable } from '@blameable/core-data';

import { db } from '../../clients/db';

export class TokenService {

  async getTokensForLocale(siteId: string, locale: string) {
    const tokenEntry = await db.query.cmsTokensTable.findFirst({
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
