import { test, expect } from '@fixtures/login.fixture';
import { MenuPage } from '@pages/menu.page';
import { HelperPage } from '@pages/helper.page';

// test.beforeEach(async ({ page }) => {
//   const loginPage = new LoginPage(page);
//   await test.step(`Step 1: Go to login page`, async () => {
//     await loginPage.gotoHomePage();
//   });
//   await test.step(`Step 2: Login with valid credentials`, async () => {
//     await loginPage.login('Admin', 'admin123');
//   });
// });

test.describe(`Verify Helper Page`, async () => {
  test(`HELP-001: Verify that 'Helper' page is opened successfully`, async ({ loginPage }) => {
    const menuPage = new MenuPage(loginPage.getPage);
    await test.step(`Step 1: Navigate to Dashboard page`, async () => {
      await menuPage.accessToMenuItem('Dashboard');
    });

    await test.step(`Step 2: Verify that 'Helper' page is opened successfully`, async () => {
      const [newHelperPage] = await Promise.all([
        loginPage.getPage.context().waitForEvent('page'),
        menuPage.btnHelper.click(),
      ]);
      const helperpage = new HelperPage(newHelperPage);
      await expect(newHelperPage.url()).toContain('hc/en-us');
      await expect(helperpage.btnAdminUserGuide.getElement()).toBeVisible();
      await expect(helperpage.btnEmployeeUserGuide.getElement()).toBeVisible();
      await expect(helperpage.btnMobileApp.getElement()).toBeVisible();
      await expect(helperpage.btnFAQs.getElement()).toBeVisible();
      await expect(helperpage.btnAWSGuid.getElement()).toBeVisible();
    });
  });
});
