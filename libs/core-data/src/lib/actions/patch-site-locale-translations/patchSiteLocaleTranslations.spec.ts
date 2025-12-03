import { patchSiteLocaleTranslations } from './patchSiteLocaleTranslations';
import type { Database } from '../../db';

describe('patchSiteLocaleTranslations', () => {
  it('should update locale translations (happy path)', async () => {
    const mockTranslations = {
      translations: {
        'en-US': {
          'key1': 'value1',
        },
      },
    };

    const mockUpdatedTranslations = {
      translations: {
        'en-US': {
          'key1': 'value1',
          'key2': 'value2',
        },
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

    const result = await patchSiteLocaleTranslations(
      mockDb,
      'user-123',
      'site-123',
      'en-US',
      { key2: 'value2' }
    );

    expect(result).toEqual({
      'key1': 'value1',
      'key2': 'value2',
    });
  });
});