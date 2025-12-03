import { patchSite } from './patchSite';
import type { Database } from '../../db';

describe('patchSite', () => {
  it('should update a site (happy path)', async () => {
    const mockOwnership = {
      userId: 'user-123',
      siteId: 'site-123',
      owner: true,
    };

    const mockUpdatedSite = {
      id: 'site-123',
      name: 'Updated Site Name',
      defaultLocale: 'en-US',
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-02'),
    };

    const mockDb = {
      select: jest.fn().mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockResolvedValue([mockOwnership]),
        }),
      }),
      update: jest.fn().mockReturnValue({
        set: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            returning: jest.fn().mockResolvedValue([mockUpdatedSite]),
          }),
        }),
      }),
    } as unknown as Database;

    const result = await patchSite(mockDb, 'site-123', 'user-123', {
      name: 'Updated Site Name',
    });

    expect(result).toEqual({
      id: 'site-123',
      name: 'Updated Site Name',
      defaultLocale: 'en-US',
      isOwner: true,
      createdAt: mockUpdatedSite.createdAt,
      updatedAt: mockUpdatedSite.updatedAt,
    });
  });
});