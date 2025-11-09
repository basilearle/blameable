import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');

  // NOTE: seems BetterAuth is not returning a missing session in e2e mode right now.
  expect(await page.locator('h2').innerText()).toContain('This is the Dashboard.');
});
