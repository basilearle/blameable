import { listSiteLocales } from './listSiteLocales';
import type { Database } from '../../db';

describe('listSiteLocales', () => {
  it('should return list of locales for a site (happy path)', async () => {
    const mockTranslations = {
      'en-US': {},
      'fr-FR': {},
      'es-MX': {},
    };

    const mockData = {
      translations: mockTranslations,
    };

    const mockDb = {
      select: jest.fn().mockReturnValue({
        from: jest.fn().mockReturnValue({
          innerJoin: jest.fn().mockReturnValue({
            where: jest.fn().mockResolvedValue([mockData]),
          }),
        }),
      }),
    } as unknown as Database;

    const result = await listSiteLocales(mockDb, 'site-123', 'user-123');

    expect(result).toEqual(['en-US', 'fr-FR', 'es-MX']);
  });
});