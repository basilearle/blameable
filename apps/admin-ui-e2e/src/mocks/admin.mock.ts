import { Page } from '@playwright/test';

const MOCK_SITES = [
  {
    id: 'site-1',
    name: 'Test Site 1',
    isOwner: true,
  },
  {
    id: 'site-2',
    name: 'Test Site 2',
    isOwner: false,
  },
];

const MOCK_SESSION = {
  user: {
    id: 'user-123',
    email: 'test@example.com',
    name: 'Test User',
  },
  session: {
    id: 'session-123',
    userId: 'user-123',
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
  },
};

export interface AdminMockOptions {
  sites?: typeof MOCK_SITES;
  session?: typeof MOCK_SESSION | null;
  delay?: number;
}

/**
 * Mocks the /api/admin/sites endpoint for Playwright tests
 */
export async function mockAdminSites(
  page: Page,
  options: AdminMockOptions = {}
) {
  const { sites = MOCK_SITES, delay = 0 } = options;

  await page.route('**/api/admin/sites', async (route) => {
    // Simulate network delay if needed
    if (delay > 0) {
      await new Promise(resolve => setTimeout(resolve, delay));
    }

    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(sites),
    });
  });
}

/**
 * Mocks the BetterAuth session endpoint
 */
export async function mockAuthSession(
  page: Page,
  options: AdminMockOptions = {}
) {
  const { session = MOCK_SESSION, delay = 0 } = options;

  await page.route('**/api/auth/get-session', async (route) => {
    // Simulate network delay if needed
    if (delay > 0) {
      await new Promise(resolve => setTimeout(resolve, delay));
    }

    if (session === null) {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ user: null, session: null }),
      });
    } else {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(session),
      });
    }
  });
}

/**
 * Mocks all admin API endpoints commonly used in tests
 */
export async function mockAllAdminAPIs(page: Page, options: AdminMockOptions = {}) {
  await mockAuthSession(page, options);
  await mockAdminSites(page, options);
}