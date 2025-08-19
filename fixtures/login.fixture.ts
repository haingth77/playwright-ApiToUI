import { test as base, expect } from '@playwright/test';
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
