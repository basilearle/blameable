import { deleteSite } from './deleteSite';
import type { Database } from '../../db';

describe('deleteSite', () => {
  it('should delete a site (happy path)', async () => {
    const mockOwnership = {
      userId: 'user-123',
      siteId: 'site-123',
      owner: true,
    };

    const mockDb = {
      select: jest.fn().mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockResolvedValue([mockOwnership]),
        }),
      }),
      delete: jest.fn().mockReturnValue({
        where: jest.fn().mockResolvedValue(undefined),
      }),
    } as unknown as Database;

    const result = await deleteSite(mockDb, 'user-123', 'site-123');

    expect(result).toBe(true);
  });
});