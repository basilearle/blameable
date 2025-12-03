import { createSite } from './createSite';
import type { Database } from '../../db';

describe('createSite', () => {
  it('should create a new site (happy path)', async () => {
    const mockSite = {
      id: 'site-123',
      name: 'New Site',
      defaultLocale: 'en-US',
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
    };

    const mockDb = {
      insert: jest.fn().mockReturnValue({
        values: jest.fn().mockReturnValue({
          returning: jest.fn().mockResolvedValue([mockSite]),
        }),
      }),
    } as unknown as Database;

    const result = await createSite(mockDb, 'user-123', {
      name: 'New Site',
      defaultLocale: 'en-US',
    });

    expect(result).toEqual({
      id: 'site-123',
      name: 'New Site',
      defaultLocale: 'en-US',
      isOwner: true,
      createdAt: mockSite.createdAt,
      updatedAt: mockSite.updatedAt,
    });
  });
});