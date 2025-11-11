import { Hono } from 'hono';

import { useSiteId, SiteIdVariables } from './useSiteId';

describe('useSiteId', () => {
  let app: Hono<{ Variables: SiteIdVariables }>;

  beforeEach(() => {
    // Create a test app with the middleware and a protected route
    app = new Hono<{ Variables: SiteIdVariables }>();
    app.use('*', useSiteId);
    app.get('/protected', (c) => {
      return c.json({
        siteId: c.get('siteId'),
      });
    });
  });

  describe('when X-Site-ID header is present', () => {
    it('should allow the request and set siteId', async () => {
      const siteId = 'effa29b5-6e0e-4ea4-9ffc-5f826170fe09';

      const res = await app.request('/protected', {
        headers: {
          'X-Site-ID': siteId,
        },
      });
      const body = await res.json();

      expect(res.status).toBe(200);
      expect(body).toEqual({
        siteId,
      });
    });

    it('should work with different site IDs', async () => {
      const siteId = 'different-site-id-123';

      const res = await app.request('/protected', {
        headers: {
          'X-Site-ID': siteId,
        },
      });
      const body = await res.json();

      expect(res.status).toBe(200);
      expect(body).toEqual({
        siteId,
      });
    });
  });

  describe('when X-Site-ID header is missing', () => {
    it('should return 400 when header is not provided', async () => {
      const res = await app.request('/protected');
      const body = await res.json();

      expect(res.status).toBe(400);
      expect(body).toEqual({
        error: 'Bad Request',
        message: 'X-Site-ID header is required',
      });
    });

    it('should return 400 when header is empty string', async () => {
      const res = await app.request('/protected', {
        headers: {
          'X-Site-ID': '',
        },
      });
      const body = await res.json();

      expect(res.status).toBe(400);
      expect(body).toEqual({
        error: 'Bad Request',
        message: 'X-Site-ID header is required',
      });
    });
  });

  describe('header name case insensitivity', () => {
    it('should work with lowercase header name', async () => {
      const siteId = 'test-site-id';

      const res = await app.request('/protected', {
        headers: {
          'x-site-id': siteId,
        },
      });
      const body = await res.json();

      expect(res.status).toBe(200);
      expect(body).toEqual({
        siteId,
      });
    });

    it('should work with mixed case header name', async () => {
      const siteId = 'test-site-id';

      const res = await app.request('/protected', {
        headers: {
          'X-SITE-ID': siteId,
        },
      });
      const body = await res.json();

      expect(res.status).toBe(200);
      expect(body).toEqual({
        siteId,
      });
    });
  });
});