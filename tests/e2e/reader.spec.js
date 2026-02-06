import { expect, test } from '@playwright/test';

test('reader renders tokens', async ({ page }) => {
  await page.goto('/reader/1john/1');
  await expect(page.getByText('Verse 1')).toBeVisible();
  await expect(page.getByText('ὃ')).toBeVisible();
});
