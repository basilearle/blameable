import { healthRouter } from './router';

describe('Health Router', () => {
  describe('GET /', () => {
    it('should return a 200 status code', async () => {
      const res = await healthRouter.request('/');

      expect(res.status).toBe(200);
    });
  });
});
