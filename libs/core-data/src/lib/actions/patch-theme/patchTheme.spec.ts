import { patchTheme } from './patchTheme';
import type { Database } from '../../db';

describe('patchTheme', () => {
  it('should update site theme (happy path)', async () => {
    const mockThemeData = {
      theme: {
        accentColor: 'blue',
      },
    };

    const mockDb = {
      select: jest.fn().mockReturnValue({
        from: jest.fn().mockReturnValue({
          innerJoin: jest.fn().mockReturnValue({
            where: jest.fn().mockResolvedValue([mockThemeData]),
          }),
        }),
      }),
      update: jest.fn().mockReturnValue({
        set: jest.fn().mockReturnValue({
          where: jest.fn().mockResolvedValue(undefined),
        }),
      }),
    } as unknown as Database;

    const result = await patchTheme(mockDb, 'site-123', 'user-123', {
      radius: 'medium',
    });

    expect(result).toEqual({
      accentColor: 'blue',
      radius: 'medium',
    });
  });
});