import { AdminPage } from "@/pages/admin.page";
import { LoginPage } from "@/pages/login.page";
import BasePage from "@/utils/base.page";
import { LogUtils } from "@/utils/log.utils";
import verification from "@/utils/verification";
import { test } from "@playwright/test";

test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status === "failed") {
    const basePage = new BasePage(page);
    await basePage.takeScreenshot(testInfo.title);
    LogUtils.logStep(`❌ Test failed. Screenshot saved: ${testInfo.title}`);
  }
});

test.describe(`Navigate Admin Page`, () => {
  test(`NAV-001: Navigate to Admin Page`, async ({ page }) => {
    const loginPage = new LoginPage(page);
    LogUtils.logStep("Step 1: Go to the login page");
    await loginPage.gotoHomePage();

    LogUtils.logStep("Step 2: Login with valid credentials");
    await loginPage.login("Admin", "admin123");

    const adminPage = new AdminPage(page);
    LogUtils.logStep("Step 3: Navigate to Admin Page");
    await adminPage.gotoAdminPage();

    LogUtils.logStep("Step 4: Verify the Admin Page Title");
    await adminPage.txtAdminPageTitle.isDisplayed()
    await adminPage.formSystemUserFilter.isDisplayed()
    await adminPage.tableSystemUser.isDisplayed()
  });
});
