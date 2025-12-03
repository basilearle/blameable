import { test as base } from '@playwright/test';

import { mockAllAdminAPIs } from './mocks/admin.mock';

/**
 * Extended Playwright test with API mocking fixture
 *
 * Usage:
 * ```ts
 * import { test, expect } from './fixtures';
 *
 * test('my test', async ({ page }) => {
 *   // All admin APIs are automatically mocked
 *   await page.goto('/');
 * });
 * ```
 */
export const test = base.extend({
  page: async ({ page }, use) => {
    // Set up API mocking before each test
    await mockAllAdminAPIs(page);

    // Use the page in the test
    await use(page);
  },
});

export { expect } from '@playwright/test';