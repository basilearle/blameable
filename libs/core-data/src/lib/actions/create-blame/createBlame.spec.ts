import { createBlame } from './createBlame';
import type { Database } from '../../db';

describe('createBlame', () => {
  it('should create a blame record (happy path)', async () => {
    const mockDb = {
      insert: jest.fn().mockReturnValue({
        values: jest.fn().mockResolvedValue(undefined),
      }),
    } as unknown as Database;

    const result = await createBlame(mockDb, 'site-123', '192.168.1.1');

    expect(result).toBe(true);
  });
});