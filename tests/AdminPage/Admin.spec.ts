import { AdminPage } from '@/pages/admin.page';
import { LoginPage } from '@/pages/login.page';
import BasePage from '@/utils/base.page';
import { LogUtils } from '@/utils/log.utils';
import { expect, test } from '@playwright/test';

test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status === 'failed') {
    const basePage = new BasePage(page);
    await basePage.takeScreenshot(testInfo.title);
    LogUtils.logStep(`❌ Test failed. Screenshot saved: ${testInfo.title}`);
  }
});

test.describe(`Navigate Admin Page`, () => {
  test(`NAV-001: Navigate to Admin Page`, async ({ page }) => {
    const loginPage = new LoginPage(page);
    const adminPage = new AdminPage(page);
    await test.step('Step 1: Go to the login page', async () => {
      await loginPage.gotoHomePage();
    });

    await test.step('Step 2: Login with valid credentials', async () => {
      await loginPage.login('Admin', 'admin123');
    });

    await test.step('Step 3: Navigate to Admin Page', async () => {
      await adminPage.gotoAdminPage();
    });

    await test.step('Step 4: Verify the Admin Page Title', async () => {
      await expect(adminPage.txtAdminPageTitle.getElement()).toBeVisible();
      await expect(adminPage.formSystemUserFilter.getElement()).toBeVisible();
      await expect(adminPage.tableSystemUser.getElement()).toBeVisible();
    });
  });
});
