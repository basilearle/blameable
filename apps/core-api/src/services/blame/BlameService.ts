import { siteBlameRegister } from '@blameable/core-data';

import { db } from '../../clients/db';

export class BlameService {

  async assignBlame(siteId: string, ipAddress: string) {
    await db.insert(siteBlameRegister).values({
      siteId: siteId,
      ipAddress: ipAddress,
    });

    return true;
  }

}

export const blameService = new BlameService();
