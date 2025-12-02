import { Database } from '../../db';
import { siteBlameRegister } from '../../schemas';

export async function createBlame(db: Database, siteId: string, ipAddress: string) {
  await db.insert(siteBlameRegister).values({
    siteId: siteId,
    ipAddress: ipAddress,
  });

  return true;
}
