import { expect, test } from '@playwright/test'

test('home page loads', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('nav')).toContainText('strichka')
  await expect(page.locator('section').first()).toBeVisible()
})
