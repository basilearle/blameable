import { createSiteLocale } from './createSiteLocale';
import type { Database } from '../../db';

describe('createSiteLocale', () => {
  it('should create a new locale for a site (happy path)', async () => {
    const mockTranslations = {
      translations: {
        'en-US': {},
      },
    };

    const mockUpdatedTranslations = {
      translations: {
        'en-US': {},
        'fr-FR': {},
      },
    };

    const mockDb = {
      select: jest.fn().mockReturnValue({
        from: jest.fn().mockReturnValue({
          innerJoin: jest.fn().mockReturnValue({
            where: jest.fn().mockResolvedValue([mockTranslations]),
          }),
        }),
      }),
      update: jest.fn().mockReturnValue({
        set: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            returning: jest.fn().mockResolvedValue([mockUpdatedTranslations]),
          }),
        }),
      }),
    } as unknown as Database;

    const result = await createSiteLocale(
      mockDb,
      'user-123',
      'site-123',
      'fr-FR'
    );

    expect(result).toEqual(['en-US', 'fr-FR']);
  });
});