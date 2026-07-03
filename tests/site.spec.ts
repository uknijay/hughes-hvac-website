import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const routes = ['/', '/about', '/services', '/engineering-services', '/projects', '/certifications', '/contact', '/careers'];
for (const route of routes) {
  test(`route ${route} renders without critical accessibility violations`, async ({ page }) => {
    await page.goto(route);
    await expect(page.locator('main')).toBeVisible();
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations.filter((v) => v.impact === 'critical')).toEqual([]);
  });
}

test('contact form accepts a valid static demo enquiry', async ({ page }) => {
  await page.goto('/contact');
  await page.getByLabel('Name').fill('QA Tester');
  await page.getByLabel('Email').fill('qa@example.com');
  await page.getByLabel('Project details').fill('Testing project enquiry');
  await page.getByRole('button', { name: 'Send enquiry' }).click();
  await expect(page.getByRole('status')).toContainText('Demo submission captured locally');
});
