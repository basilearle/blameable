import { Hono } from 'hono';

import { userGuard, UserGuardVariables } from './userGuard';

jest.mock('../../clients/db', () => ({
  db: {},
}));

jest.mock('../../clients/auth', () => ({
  auth: {
    api: {
      getSession: jest.fn(),
    },
  },
}));

describe('userGuard', () => {
  let app: Hono<{ Variables: UserGuardVariables }>;
  let mockGetSession: jest.Mock;

  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();

    // Create a test app with the middleware and a protected route
    app = new Hono<{ Variables: UserGuardVariables }>();
    app.use('*', userGuard);
    app.get('/protected', (c) => {
      return c.json({
        userId: c.get('userId'),
        sessionId: c.get('sessionId'),
      });
    });

    // Get the mocked getSession function from the mocked module
    const { auth } = require('../../clients/auth');
    mockGetSession = auth.api.getSession as jest.Mock;
  });

  describe('when session is valid and not expired', () => {
    it('should allow the request and set userId and sessionId', async () => {
      const userId = 'user-123';
      const sessionId = 'session-456';
      const futureDate = new Date(Date.now() + 86400000); // 24 hours from now

      mockGetSession.mockResolvedValue({
        user: { id: userId, name: 'Test User', email: 'test@example.com' },
        session: { id: sessionId, expiresAt: futureDate },
      });

      const res = await app.request('/protected');
      const body = await res.json();

      expect(res.status).toBe(200);
      expect(body).toEqual({
        userId,
        sessionId,
      });
    });
  });

  describe('when session is missing', () => {
    it('should return 401 when session is null', async () => {
      mockGetSession.mockResolvedValue(null);

      const res = await app.request('/protected');
      const body = await res.json();

      expect(res.status).toBe(401);
      expect(body).toEqual({
        error: 'Unauthorized',
        message: 'Valid session required',
      });
    });

    it('should return 401 when session object is missing', async () => {
      mockGetSession.mockResolvedValue({
        user: { id: 'user-123' },
        session: null,
      });

      const res = await app.request('/protected');
      const body = await res.json();

      expect(res.status).toBe(401);
      expect(body).toEqual({
        error: 'Unauthorized',
        message: 'Valid session required',
      });
    });

    it('should return 401 when user is missing', async () => {
      mockGetSession.mockResolvedValue({
        user: null,
        session: { id: 'session-456', expiresAt: new Date() },
      });

      const res = await app.request('/protected');
      const body = await res.json();

      expect(res.status).toBe(401);
      expect(body).toEqual({
        error: 'Unauthorized',
        message: 'Valid session required',
      });
    });
  });

  describe('when session is expired', () => {
    it('should return 401 with expired message', async () => {
      const pastDate = new Date(Date.now() - 86400000); // 24 hours ago

      mockGetSession.mockResolvedValue({
        user: { id: 'user-123', name: 'Test User', email: 'test@example.com' },
        session: { id: 'session-456', expiresAt: pastDate },
      });

      const res = await app.request('/protected');
      const body = await res.json();

      expect(res.status).toBe(401);
      expect(body).toEqual({
        error: 'Unauthorized',
        message: 'Session expired',
      });
    });

    it('should return 401 when session expires exactly now', async () => {
      const now = new Date();

      mockGetSession.mockResolvedValue({
        user: { id: 'user-123', name: 'Test User', email: 'test@example.com' },
        session: { id: 'session-456', expiresAt: new Date(now.getTime() - 1) },
      });

      const res = await app.request('/protected');
      const body = await res.json();

      expect(res.status).toBe(401);
      expect(body).toEqual({
        error: 'Unauthorized',
        message: 'Session expired',
      });
    });
  });

  describe('request headers', () => {
    it('should pass request headers to getSession', async () => {
      const futureDate = new Date(Date.now() + 86400000);

      mockGetSession.mockResolvedValue({
        user: { id: 'user-123', name: 'Test User', email: 'test@example.com' },
        session: { id: 'session-456', expiresAt: futureDate },
      });

      await app.request('/protected', {
        headers: {
          'Cookie': 'session=abc123',
          'Authorization': 'Bearer token123',
        },
      });

      expect(mockGetSession).toHaveBeenCalledWith({
        headers: expect.any(Headers),
      });

      const callArgs = mockGetSession.mock.calls[0][0];
      const headers = callArgs.headers as Headers;
      expect(headers.get('cookie')).toBe('session=abc123');
      expect(headers.get('authorization')).toBe('Bearer token123');
    });
  });
});
