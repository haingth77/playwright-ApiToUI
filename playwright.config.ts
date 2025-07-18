import { defineConfig, devices } from "@playwright/test";
import type { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
  testDir: "./tests",
  timeout: 30 * 1000, // 30 giây cho mỗi test
  expect: {
    timeout: 5000, // 5 giây cho các expect như `toHaveText`
  },
  fullyParallel: true,
  retries: 0, // Retry nếu fail (sử dụng trong CI)
  workers: process.env.CI ? 2 : undefined, // Giới hạn thread khi chạy CI

  use: {
    baseURL: "https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index", // Thay bằng URL thật
    headless: true,
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    trace: "retain-on-failure",
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
  },

  // Cấu hình cho nhiều trình duyệt (project)
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

  // Reporter mặc định: hiển thị terminal + HTML
  reporter: [
    ["list"],
    ["html", { open: "never" }], // 'never' để tạo báo cáo nhưng không auto mở trình duyệt
  ],

  // Chạy global setup nếu cần login trước
  // globalSetup: require.resolve('./global-setup'),
};

export default config;
