import { test as base } from '@playwright/test';

import { mockAllAPIs } from './mocks/bootstrap.mock';

/**
 * Extended Playwright test with API mocking fixture
 *
 * Usage:
 * ```ts
 * import { test, expect } from './fixtures';
 *
 * test('my test', async ({ page }) => {
 *   // All APIs are automatically mocked
 *   await page.goto('/');
 * });
 * ```
 */
export const test = base.extend({
  page: async ({ page }, use) => {
    // Set up API mocking before each test
    await mockAllAPIs(page);

    // Use the page in the test
    await use(page);
  },
});

export { expect } from '@playwright/test';
