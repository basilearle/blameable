import { and, eq } from 'drizzle-orm';

import { Database } from '../../db';
import { siteBlameRegister, usersToSites } from '../../schemas';

export type BlameMetric = {
  ipAddress: string;
};

export async function getBlameMetrics(
  db: Database,
  siteId: string,
  userId: string
): Promise<BlameMetric[]> {
  if (!db || !siteId || !userId) {
    throw new Error('getBlameMetrics: missing DB, siteId or userId');
  }

  return db
    .select({
      ipAddress: siteBlameRegister.ipAddress,
    })
    .from(siteBlameRegister)
    .innerJoin(
      usersToSites,
      and(
        eq(usersToSites.siteId, siteBlameRegister.siteId),
        eq(usersToSites.userId, userId)
      )
    )
    .where(eq(siteBlameRegister.siteId, siteId));
}
