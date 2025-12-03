import { test, expect } from './fixtures';

test('has title', async ({ page }) => {
  // APIs are automatically mocked via fixture
  await page.goto('/');

  // Expect h2 to contain the dashboard title
  expect(await page.locator('h2').innerText()).toContain('This is the Dashboard.');
});
