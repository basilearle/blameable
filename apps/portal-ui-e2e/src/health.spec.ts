import { test, expect } from './fixtures';

test('has title', async ({ page }) => {
  // APIs are automatically mocked via fixture
  await page.goto('/');

  // Expect h1 to contain a substring.
  expect(await page.locator('h1').innerText()).toContain('By Popular Demand.');
});
