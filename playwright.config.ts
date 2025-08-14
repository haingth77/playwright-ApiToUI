import { defineConfig, devices } from "@playwright/test";
import type { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
  testDir: "./tests",
  timeout: 60 * 1000, // 30 seconds for each test
  expect: {
    timeout: 5000, // 5 seconds for each expect like `toHaveText`
  },
  fullyParallel: true,
  retries: 0, // Retry if fail (used in CI)
  workers: process.env.CI ? 2 : undefined, // Limit thread when running CI

  use: {
    // baseURL: "https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index", // Replace with real URL
    headless: true,
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    trace: "retain-on-failure",
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
  },

  // Configuration for multiple browsers (project)
  projects: [
    {
      name: "Chromium",
      use: { ...devices["Desktop Chrome"] },
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
    ["list"],
    ["html", { open: "never" }], // 'never' to create report but not auto open browser
  ],

  // Run global setup if needed login before
  // globalSetup: require.resolve('./global-setup'),
};

export default config;
