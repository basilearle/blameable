import { getClientSiteLocaleTranslations } from './getClientSiteLocaleTranslations';
import type { Database } from '../../db';

describe('getClientSiteLocaleTranslations', () => {
  it('should return locale translations for client (happy path)', async () => {
    const mockTranslations = {
      'key1': 'value1',
      'key2': 'value2',
    };

    const mockSiteData = {
      translations: {
        'en-US': mockTranslations,
      },
    };

    const mockGlobalData = {
      translations: {
        'en-US': {},
      },
    };

    const mockDb = {
      select: jest.fn()
        .mockReturnValueOnce({
          from: jest.fn().mockReturnValue({
            innerJoin: jest.fn().mockReturnValue({
              where: jest.fn().mockResolvedValue([mockSiteData]),
            }),
          }),
        })
        .mockReturnValueOnce({
          from: jest.fn().mockReturnValue({
            innerJoin: jest.fn().mockReturnValue({
              where: jest.fn().mockResolvedValue([mockGlobalData]),
            }),
          }),
        }),
    } as unknown as Database;

    const result = await getClientSiteLocaleTranslations(
      mockDb,
      'site-123',
      'en-US'
    );

    expect(result).toEqual(mockTranslations);
  });
});