import { getSiteTheme } from './getSiteTheme';
import type { Database } from '../../db';

describe('getSiteTheme', () => {
  it('should return site theme (happy path)', async () => {
    const mockTheme = { accentColor: 'blue', radius: 'medium' };
    const mockSiteTheme = { theme: mockTheme };
    const mockGlobalTheme = { theme: { accentColor: 'red' } };

    const mockDb = {
      select: jest.fn()
        .mockReturnValueOnce({
          from: jest.fn().mockReturnValue({
            innerJoin: jest.fn().mockReturnValue({
              where: jest.fn().mockResolvedValue([mockSiteTheme]),
            }),
          }),
        })
        .mockReturnValueOnce({
          from: jest.fn().mockReturnValue({
            innerJoin: jest.fn().mockReturnValue({
              where: jest.fn().mockResolvedValue([mockGlobalTheme]),
            }),
          }),
        }),
    } as unknown as Database;

    const result = await getSiteTheme(mockDb, 'user-123', 'site-123');

    expect(result).toEqual(mockTheme);
  });
});