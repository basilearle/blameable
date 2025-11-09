import { blameRegisterTable } from '@blameable/core-data';

import { db } from '../../clients/db';

export class BlameService {

  async assignBlame(siteId: string, ipAddress: string) {
    await db.insert(blameRegisterTable).values({
      site_id: siteId,
      ip_address: ipAddress,
    });

    return true;
  }

}

export const blameService = new BlameService();
