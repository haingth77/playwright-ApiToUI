import { AdminPage } from '@/pages/admin.page';
import { MenuPage } from '@/pages/menu.page';
import BasePage from '@/utils/base.page';
import { LogUtils } from '@/utils/log.utils';
import { expect, test } from '@fixtures/login.fixture';

test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status === 'failed') {
    const basePage = new BasePage(page);
    await basePage.takeScreenshot(testInfo.title);
    LogUtils.logStep(`❌ Test failed. Screenshot saved: ${testInfo.title}`);
  }
});

test.describe(`Navigate Admin Page`, async() => {
  test(`NAV-001: Navigate to Admin Page`, async ({ loginPage }) => {
    const menuPage = new MenuPage(loginPage.getPage);
    const adminPage = new AdminPage(loginPage.getPage);
    
    await test.step('Step 1: Navigate to Admin Page', async () => {
      await menuPage.accessToMenuItem('Admin');
    });

    await test.step('Step 4: Verify the Admin Page Title', async () => {
      await expect(adminPage.txtAdminPageTitle.getElement()).toContainText('Admin');
      await expect(adminPage.formSystemUserFilter.getElement()).toBeVisible();
      await expect(adminPage.tableSystemUser.getElement()).toBeVisible();
    });
  });
});
