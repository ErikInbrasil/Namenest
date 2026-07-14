import { expect, test } from '@playwright/test';

test('mobile homepage has thumb-friendly quick actions and no horizontal overflow', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('link', { name: /generate/i }).first()).toBeVisible();
  await expect(page.getByTestId('mobile-quick-actions')).toBeVisible();
  await expect(page.getByTestId('mobile-generate-action')).toBeVisible();
  await expect(page.getByTestId('mobile-family-action')).toBeVisible();

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
  expect(overflow).toBe(false);
});
