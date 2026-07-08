import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const routes = ['/', '/about', '/services', '/engineering-services', '/projects', '/certifications', '/contact', '/careers', '/admin'];
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

test('admin can log in, save content to database, export, and store change requests', async ({ page }) => {
  const edited = `HVAC editable test ${Date.now()}`;

  await page.goto('/?admin=1');
  await page.getByRole('button', { name: 'Log in' }).click();
  await expect(page.getByText('Admin login active')).toBeVisible();

  const heading = page.locator('main h1').first();
  const original = (await heading.innerText()).trim();
  await expect(heading).toHaveAttribute('contenteditable', 'true');
  await heading.fill(edited);
  await page.getByRole('button', { name: 'Save draft' }).click({ force: true });
  await expect(page.getByText('Saved to database')).toBeVisible();

  await page.reload();
  await expect(page.getByRole('heading', { name: edited, level: 1 })).toBeVisible();

  await page.locator('.hero-photo-frame').click({ position: { x: 40, y: 40 } });
  await page.locator('.admin-upload:not(.admin-import) input[type="file"]').setInputFiles({
    name: 'owner-preview.png',
    mimeType: 'image/png',
    buffer: Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/p9sAAAAASUVORK5CYII=', 'base64')
  });
  await expect(page.getByText('Image uploaded')).toBeVisible();
  await page.getByRole('button', { name: 'Save draft' }).click({ force: true });
  await expect(page.getByText('Saved to database')).toBeVisible();

  await page.getByRole('textbox', { name: 'Change request', exact: true }).fill('Please review the owner supplied photography choices.');
  await page.getByRole('button', { name: 'Store request' }).click();
  await expect(page.getByText('Change request stored')).toBeVisible();

  const exportResponse = await page.request.get('/api/cms/export');
  expect(exportResponse.ok()).toBeTruthy();
  const exported = await exportResponse.json();
  expect(exported.state.fields).toBeTruthy();
  expect(Object.values(exported.state.media).some((value) => String(value).includes('/api/cms/media/') || String(value).includes('blob.vercel-storage.com'))).toBeTruthy();
  expect(exported.changeRequests.length).toBeGreaterThan(0);

  await expect(page.locator('main h1').first()).toHaveAttribute('contenteditable', 'true');
  await page.locator('main h1').first().fill(original);
  await page.getByRole('button', { name: 'Save draft' }).click({ force: true });
  await expect(page.getByText('Saved to database')).toBeVisible();
});
