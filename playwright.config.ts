import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
  testDir: './tests',
  webServer: { command: 'npm run dev -- --port 3100', url: 'http://localhost:3100', reuseExistingServer: false, timeout: 120000 },
  use: { baseURL: 'http://localhost:3100', trace: 'on-first-retry' },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }]
});
