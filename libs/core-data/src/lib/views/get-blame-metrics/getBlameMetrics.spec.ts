import { getBlameMetrics } from './getBlameMetrics';
import type { Database } from '../../db';

describe('getBlameMetrics', () => {
  it('should throw an error if DB is missing', async () => {
    await expect(
      getBlameMetrics(null as unknown as Database, 'site-123', 'user-123')
    ).rejects.toThrow('getBlameMetrics: missing DB, siteId or userId');
  });

  it('should throw an error if siteId is missing', async () => {
    const mockDb = {} as Database;
    await expect(
      getBlameMetrics(mockDb, '', 'user-123')
    ).rejects.toThrow('getBlameMetrics: missing DB, siteId or userId');
  });

  it('should throw an error if userId is missing', async () => {
    const mockDb = {} as Database;
    await expect(
      getBlameMetrics(mockDb, 'site-123', '')
    ).rejects.toThrow('getBlameMetrics: missing DB, siteId or userId');
  });

  it('should return an empty array when user does not have access to the site', async () => {
    const mockDb = {
      select: jest.fn().mockReturnValue({
        from: jest.fn().mockReturnValue({
          innerJoin: jest.fn().mockReturnValue({
            where: jest.fn().mockResolvedValue([]),
          }),
        }),
      }),
    } as unknown as Database;

    const result = await getBlameMetrics(mockDb, 'site-113', 'user-123');

    expect(result).toEqual([]);
  });

  it('should return an empty array when site has no blame records', async () => {
    const mockDb = {
      select: jest.fn().mockReturnValue({
        from: jest.fn().mockReturnValue({
          innerJoin: jest.fn().mockReturnValue({
            where: jest.fn().mockResolvedValue([]),
          }),
        }),
      }),
    } as unknown as Database;

    const result = await getBlameMetrics(mockDb, 'site-123', 'user-123');

    expect(result).toEqual([]);
  });

  it('should return blame metrics when user has access to the site', async () => {
    const mockBlameData = [
      { ipAddress: '192.168.1.1' },
      { ipAddress: '10.0.0.1' },
      { ipAddress: '172.16.0.1' },
    ];

    const mockDb = {
      select: jest.fn().mockReturnValue({
        from: jest.fn().mockReturnValue({
          innerJoin: jest.fn().mockReturnValue({
            where: jest.fn().mockResolvedValue(mockBlameData),
          }),
        }),
      }),
    } as unknown as Database;

    const result = await getBlameMetrics(mockDb, 'site-123', 'user-123');

    expect(result).toHaveLength(3);
    expect(result).toEqual([
      { ipAddress: '192.168.1.1' },
      { ipAddress: '10.0.0.1' },
      { ipAddress: '172.16.0.1' },
    ]);
  });

  it('should return a single blame metric', async () => {
    const mockBlameData = [{ ipAddress: '203.0.113.1' }];

    const mockDb = {
      select: jest.fn().mockReturnValue({
        from: jest.fn().mockReturnValue({
          innerJoin: jest.fn().mockReturnValue({
            where: jest.fn().mockResolvedValue(mockBlameData),
          }),
        }),
      }),
    } as unknown as Database;

    const result = await getBlameMetrics(mockDb, 'site-456', 'user-456');

    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({ ipAddress: '203.0.113.1' });
  });
});
