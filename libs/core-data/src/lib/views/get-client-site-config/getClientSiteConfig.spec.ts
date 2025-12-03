import { getClientSiteConfig } from './getClientSiteConfig';
import type { Database } from '../../db';

describe('getClientSiteConfig', () => {
  it('should return client site config (happy path)', async () => {
    const mockConfigData = {
      id: 'site-123',
      name: 'Test Site',
      defaultLocale: 'en-US',
      theme: { accentColor: 'blue' },
      translations: { 'en-US': {}, 'fr-FR': {} },
    };

    const mockDb = {
      select: jest.fn().mockReturnValue({
        from: jest.fn().mockReturnValue({
          innerJoin: jest.fn().mockReturnValue({
            where: jest.fn().mockResolvedValue([mockConfigData]),
          }),
        }),
      }),
    } as unknown as Database;

    const result = await getClientSiteConfig(mockDb, 'site-123');

    expect(result).toEqual({
      id: 'site-123',
      name: 'Test Site',
      defaultLocale: 'en-US',
      theme: { accentColor: 'blue' },
      availableLocales: ['en-US', 'fr-FR'],
    });
  });
});