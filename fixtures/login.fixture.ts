import { test as base, expect as baseExpect } from '@playwright/test';
import { LoginPage } from '@pages/login.page';
import { MenuPage } from '@pages/menu.page';
import { LeavePage } from '@pages/leave.page';
import { NotificationComponent } from '@/utils/notification.component';

// Define fixture types
type MyFixtures = {
  loginPage: LoginPage;
};

// Extend base test với custom fixtures
export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.gotoHomePage();
    await loginPage.login('Admin', 'admin123');
    await use(loginPage);
  },
});

// Custom expect with domain-specific matchers
const expect = baseExpect.extend({
  // Check if element has OrangeHRM success notification
  async toBeSuccessNotification(locator) {
    const classList = await locator.getAttribute('class');
    const isSuccess =
      classList?.includes('oxd-toast--success') ||
      classList?.includes('success') ||
      classList?.includes('positive');

    return {
      message: () => `Expected notification to be success type`,
      pass: isSuccess,
    };
  },

  // Custom matcher for checking if element has specific CSS class
  async toHaveClass(locator, expectedClass) {
    const className = await locator.getAttribute('class');
    const hasClass = className?.includes(expectedClass) || false;

    return {
      message: () => `Expected element to have class "${expectedClass}"`,
      pass: hasClass,
    };
  },

  // Custom matcher for checking element count
  async toHaveCount(locator, expectedCount) {
    const actualCount = await locator.count();

    return {
      message: () => `Expected ${expectedCount} elements, but found ${actualCount}`,
      pass: actualCount === expectedCount,
    };
  },

  // Check if API response is successful
  async toBeSuccessfulResponse(response) {
    const status = response.status();
    const isSuccess = status >= 200 && status < 300;

    return {
      message: () => `Expected response status to be successful (2xx), but got ${status}`,
      pass: isSuccess,
    };
  },

  // Advanced API response matcher with AJV
  async toMatchApiSchema(response, schema) {
    const Ajv = require('ajv');
    const ajv = new Ajv();

    const json = await response.json();
    const status = response.status();

    // Check status code
    if (status < 200 || status >= 300) {
      return {
        message: () => `API response failed with status ${status}`,
        pass: false,
      };
    }

    // Validate JSON schema with AJV
    const validate = ajv.compile(schema);
    const isValid = validate(json);

    return {
      message: () =>
        isValid
          ? `API response matches schema`
          : `Schema validation failed: ${JSON.stringify(validate.errors, null, 2)}`,
      pass: isValid,
    };
  },

  // Performance matcher
  async toLoadWithinTime(page, maxTime = 3000) {
    const startTime = Date.now();
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - startTime;

    return {
      message: () => `Page loaded in ${loadTime}ms (expected < ${maxTime}ms)`,
      pass: loadTime < maxTime,
    };
  },
});
export { expect };
// 1. Login Page fixture
//   loginPage: async ({ page }, use) => {
//     const loginPage = new LoginPage(page);
//     await loginPage.gotoHomePage();
//     await use(loginPage);
//   },

//   // 2. Authenticated Page fixture (đã login)
//   authenticatedPage: async ({ page }, use) => {
//     const loginPage = new LoginPage(page);
//     await loginPage.gotoHomePage();
//     await loginPage.login('Admin', 'admin123');
//     await use(page);
//   },

//   // 3. Menu Page fixture
//   menuPage: async ({ page }, use) => {
//     const menuPage = new MenuPage(page);
//     await use(menuPage);
//   },

//   // 4. Leave Page fixture (với navigation)
//   leavePage: async ({ authenticatedPage, menuPage }, use) => {
//     await menuPage.accessToMenuItem('Leave');
//     const leavePage = new LeavePage(authenticatedPage);
//     await use(leavePage);
//   },

//   // 6. Helper Page fixture
//   helperPage: async ({ authenticatedPage, menuPage }, use) => {
//     await menuPage.accessToMenuItem('Dashboard');
//     const [newHelperPage] = await Promise.all([
//       authenticatedPage.context().waitForEvent('page'),
//       menuPage.btnHelper.click(),
//     ]);
//     // Import HelperPage ở đầu file
//     const { HelperPage } = await import('@pages/helper.page');
//     const helperPage = new HelperPage(newHelperPage);
//     await use(helperPage);
//   },

//   // 5. Notification fixture
//   notification: async ({ page }, use) => {
//     const notification = new NotificationComponent(page);
//     await use(notification);
//   },
// });
