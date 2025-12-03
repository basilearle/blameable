import { getSiteLocaleTranslations } from './getSiteLocaleTranslations';
import type { Database } from '../../db';

describe('getSiteLocaleTranslations', () => {
  it('should return site locale translations (happy path)', async () => {
    const mockTranslations = {
      'key1': 'value1',
      'key2': 'value2',
    };

    const mockData = {
      translations: {
        'en-US': mockTranslations,
      },
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

    const result = await getSiteLocaleTranslations(
      mockDb,
      'site-123',
      'user-123',
      'en-US'
    );

    expect(result).toEqual(mockTranslations);
  });
});