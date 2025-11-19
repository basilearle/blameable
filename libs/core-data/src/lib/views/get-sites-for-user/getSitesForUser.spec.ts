import { getSitesForUser } from './getSitesForUser';
import type { Database } from '../../db';

describe('getSitesForUser', () => {
  it('should throw an error if DB is missing', async () => {
    await expect(
      getSitesForUser(null as unknown as Database, 'user123')
    ).rejects.toThrow('getSitesForUser: missing DB or userId');
  });

  it('should throw an error if userId is missing', async () => {
    const mockDb = {} as Database;
    await expect(
      getSitesForUser(mockDb, '')
    ).rejects.toThrow('getSitesForUser: missing DB or userId');
  });

  it('should return an empty array if no records are found', async () => {
    const mockDb = {
      select: jest.fn().mockReturnValue({
        from: jest.fn().mockReturnValue({
          innerJoin: jest.fn().mockReturnValue({
            where: jest.fn().mockResolvedValue([]),
          }),
        }),
      }),
    } as unknown as Database;

    const result = await getSitesForUser(mockDb, 'user123');

    expect(result).toEqual([]);
  });

  it('should correctly map the results', async () => {
    const mockData = [
      {
        id: 'site-1',
        name: 'Site One',
        isOwner: true,
      },
      {
        id: 'site-2',
        name: 'Site Two',
        isOwner: false,
      },
    ];

    const mockDb = {
      select: jest.fn().mockReturnValue({
        from: jest.fn().mockReturnValue({
          innerJoin: jest.fn().mockReturnValue({
            where: jest.fn().mockResolvedValue(mockData),
          }),
        }),
      }),
    } as unknown as Database;

    const result = await getSitesForUser(mockDb, 'user123');

    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({
      id: 'site-1',
      name: 'Site One',
      isOwner: true,
    });
    expect(result[1]).toEqual({
      id: 'site-2',
      name: 'Site Two',
      isOwner: false,
    });
  });
});
