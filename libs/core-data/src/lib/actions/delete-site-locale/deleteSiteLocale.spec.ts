import { deleteSiteLocale } from './deleteSiteLocale';
import type { Database } from '../../db';

describe('deleteSiteLocale', () => {
  it('should delete a locale from a site (happy path)', async () => {
    const mockTranslations = {
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
          where: jest.fn().mockResolvedValue(undefined),
        }),
      }),
    } as unknown as Database;

    const result = await deleteSiteLocale(
      mockDb,
      'user-123',
      'site-123',
      'fr-FR'
    );

    expect(result).toBe(true);
  });
});