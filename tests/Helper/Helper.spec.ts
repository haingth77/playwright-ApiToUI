import { test, expect } from '@playwright/test';
import { LoginPage } from '@pages/login.page';
import { MenuPage } from '@pages/menu.page';
import { HelperPage } from '@pages/helper.page';
import BasePage from '@/utils/base.page';

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await test.step(`Step 1: Go to login page`, async () => {
    await loginPage.gotoHomePage();
  });
  await test.step(`Step 2: Login with valid credentials`, async () => {
    await loginPage.login('Admin', 'admin123');
  });
});

test.describe(`Verify Helper Page`, async () => {
  test(`HELP-001: Verify that 'Helper' page is opened successfully`, async ({ page }) => {
    const menuPage = new MenuPage(page);
    await test.step(`Step 3: Navigate to Dashboard page`, async () => {
      await menuPage.accessToMenuItem('Dashboard');
    });

    await test.step(`Step 4: Verify that 'Helper' page is opened successfully`, async () => {
      const [newHelperPage] = await Promise.all([
        page.context().waitForEvent('page'),
        menuPage.btnHelper.click()
      ])
      const helperpage = new HelperPage(newHelperPage)
      await expect(newHelperPage.url()).toContain('hc/en-us')
      await expect(helperpage.btnAdminUserGuide.getElement()).toBeVisible()
      await expect(helperpage.btnEmployeeUserGuide.getElement()).toBeVisible()
      await expect(helperpage.btnMobileApp.getElement()).toBeVisible()
      await expect(helperpage.btnFAQs.getElement()).toBeVisible()
      await expect(helperpage.btnAWSGuid.getElement()).toBeVisible()
    })
  });
});
