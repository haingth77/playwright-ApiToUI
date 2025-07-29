import { AdminPage } from '@/pages/admin.page';
import { Admin_UserManagementPage } from '@/pages/admin.usermanagement.page';
import { LoginPage } from '@/pages/login.page';
import { test, expect } from '@playwright/test';

test.describe(`User Management in Admin page`, async () => {
  test(`AUM-001: Verify that 'Users' is displayed when 'User' is selected`, async ({ page }) => {
    const loginPage = new LoginPage(page);
    const adminPage = new AdminPage(page);
    const admin_userManagementPage = new Admin_UserManagementPage(page);
    await test.step('Step 1: Go to the login page', async () => {
      await loginPage.gotoHomePage();
    });

    await test.step('Step 2: Login with valid credentials', async () => {
      await loginPage.login('Admin', 'admin123');
    });

    await test.step('Step 3: Navigate to Admin Page', async () => {
      await adminPage.gotoAdminPage();
    });

    await test.step("Step 4: Click on 'User' selection", async () => {
      await admin_userManagementPage.selectOptionUsers();
    });

    await test.step("Step 5: Verify that 'User' page is display", async () => {
      await expect(adminPage.txtAdminPageTitle.getElement()).toBeVisible();
      await expect(adminPage.formSystemUserFilter.getElement()).toBeVisible();
      await expect(adminPage.tableSystemUser.getElement()).toBeVisible();
    });
  });
});
