import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/dashboard');

  await page.getByRole('button', { name: 'Logout' }).click();
});