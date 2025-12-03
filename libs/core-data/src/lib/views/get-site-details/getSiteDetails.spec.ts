import { getSiteDetails } from './getSiteDetails';
import type { Database } from '../../db';

describe('getSiteDetails', () => {
  it('should throw an error if DB is missing', async () => {
    await expect(
      getSiteDetails(null as unknown as Database, 'site-123', 'user-123')
    ).rejects.toThrow('getSiteDetails: missing DB, siteId or userId');
  });

  it('should throw an error if siteId is missing', async () => {
    const mockDb = {} as Database;
    await expect(
      getSiteDetails(mockDb, '', 'user-123')
    ).rejects.toThrow('getSiteDetails: missing DB, siteId or userId');
  });

  it('should throw an error if userId is missing', async () => {
    const mockDb = {} as Database;
    await expect(
      getSiteDetails(mockDb, 'site-123', '')
    ).rejects.toThrow('getSiteDetails: missing DB, siteId or userId');
  });

  it('should throw an error when user does not have access to the site', async () => {
    const mockDb = {
      select: jest.fn().mockReturnValue({
        from: jest.fn().mockReturnValue({
          innerJoin: jest.fn().mockReturnValue({
            where: jest.fn().mockResolvedValue([]),
          }),
        }),
      }),
    } as unknown as Database;

    await expect(
      getSiteDetails(mockDb, 'site-123', 'user-123')
    ).rejects.toThrow('getSiteDetails: site not found');
  });

  it('should throw an error when site does not exist', async () => {
    const mockDb = {
      select: jest.fn().mockReturnValue({
        from: jest.fn().mockReturnValue({
          innerJoin: jest.fn().mockReturnValue({
            where: jest.fn().mockResolvedValue([]),
          }),
        }),
      }),
    } as unknown as Database;

    await expect(
      getSiteDetails(mockDb, 'non-existent-site', 'user-123')
    ).rejects.toThrow('getSiteDetails: site not found');
  });

  it('should correctly return site details when user has access', async () => {
    const mockSiteData = {
      id: 'site-123',
      name: 'Test Site',
      defaultLocale: 'en-US',
      isOwner: true,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-02'),
    };

    const mockDb = {
      select: jest.fn().mockReturnValue({
        from: jest.fn().mockReturnValue({
          innerJoin: jest.fn().mockReturnValue({
            where: jest.fn().mockResolvedValue([mockSiteData]),
          }),
        }),
      }),
    } as unknown as Database;

    const result = await getSiteDetails(mockDb, 'site-123', 'user-123');

    expect(result).toEqual({
      id: 'site-123',
      name: 'Test Site',
      defaultLocale: 'en-US',
      isOwner: true,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-02'),
    });
  });

  it('should correctly return site details when user is not owner', async () => {
    const mockSiteData = {
      id: 'site-456',
      name: 'Shared Site',
      defaultLocale: 'fr-FR',
      isOwner: false,
      createdAt: new Date('2024-02-01'),
      updatedAt: new Date('2024-02-15'),
    };

    const mockDb = {
      select: jest.fn().mockReturnValue({
        from: jest.fn().mockReturnValue({
          innerJoin: jest.fn().mockReturnValue({
            where: jest.fn().mockResolvedValue([mockSiteData]),
          }),
        }),
      }),
    } as unknown as Database;

    const result = await getSiteDetails(mockDb, 'site-456', 'user-456');

    expect(result).toEqual({
      id: 'site-456',
      name: 'Shared Site',
      defaultLocale: 'fr-FR',
      isOwner: false,
      createdAt: new Date('2024-02-01'),
      updatedAt: new Date('2024-02-15'),
    });
  });
});
