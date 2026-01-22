import { defineConfig, devices } from '@playwright/test';
import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: './tests',
  timeout: 120 * 1000, // 120 seconds for each test (increased for debugging)
  expect: {
    timeout: 10_000, // 100 seconds for each expect (increased)
  },
  fullyParallel: true,
  retries: 0, // Retry if fail (used in CI)
  workers: process.env.CI ? 2 : undefined, // Limit thread when running CI

  use: {
    // baseURL: "https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index", // Replace with real URL
    headless: true, // Always headless by default, use --headed flag to override
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
  },

  // Configuration for multiple browsers (project)
  projects: [
    {
      name: 'Chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // {
    //   name: "Firefox",
    //   use: { ...devices["Desktop Firefox"] },
    // },
    // {
    //   name: "WebKit",
    //   use: { ...devices["Desktop Safari"] },
    // },
  ],

  // Default reporter: display terminal + HTML
  reporter: [
    ['list'],
    ['html', { open: 'never' }], // 'never' to create report but not auto open browser
  ],

  // Run global setup if needed login before
  // globalSetup: require.resolve('./global-setup'),
};

export default config;
