import { getSiteDetails, SiteDetails } from '@blameable/core-data';

import { db } from '../../../clients/db';

export type SiteTheme = Record<string, string>;

export type UpdateThemeOptions = {
  siteId: string;
  userId: string;
  mergeWithGlobal?: boolean;
};

export async function getTheme({
  siteId,
  userId,
  mergeWithGlobal,
}: UpdateThemeOptions): Promise<SiteTheme> {
  const dbQueries: Array<Promise<SiteDetails>> = [];

  dbQueries.push(getSiteDetails(db, siteId, userId));

  if (mergeWithGlobal) {
    dbQueries.push(getSiteDetails(db, 'global'));
  }

  const [
    siteTokens,
    globalTokens,
  ] = await Promise.all(dbQueries);

  return {
    ...(globalTokens ?? {}).tokens as SiteTheme,
    ...siteTokens.tokens as SiteTheme,
  };
}

export async function updateTheme(theme: Partial<SiteTheme>, {
  siteId,
  userId,
}: UpdateThemeOptions): Promise<SiteTheme> {
  // TODO: validate the theme object

  const existingTheme = await getTheme({ siteId, userId });

  const updatedTheme = { ...existingTheme, ...theme } as SiteTheme;

  // TODO: update the theme in the database

  return updatedTheme;
}
