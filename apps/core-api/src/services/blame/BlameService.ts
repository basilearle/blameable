import { blameRegisterTable, Database } from '@blameable/core-data';

import { CoreDataClientService } from '../core-data-client/CoreDataClientService';

export class BlameService {

  private get db(): Database {
    return CoreDataClientService.getDatabase();
  }

  async assignBlame(siteId: string, ipAddress: string) {
    await this.db.insert(blameRegisterTable).values({
      site_id: siteId,
      ip_address: ipAddress,
    });

    return true;
  }

}

export const blameService = new BlameService();
