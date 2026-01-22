import { AdminPage } from '@/pages/admin.page';
import { Admin_UserManagementPage } from '@/pages/admin.usermanagement.page';
import { LoginPage } from '@/pages/login.page';
import { test, expect } from '@fixtures/login.fixture';

test.describe(`User Management in Admin page`, async () => {
  test(`AUM-001: Verify that 'Users' is displayed when 'User' is selected`, async ({ loginPage }) => {
    const adminPage = new AdminPage(loginPage.getPage);
    const admin_userManagementPage = new Admin_UserManagementPage(loginPage.getPage);
    await test.step('Step 1: Navigate to Admin Page', async () => {
      await adminPage.gotoAdminPage();
    });

    await test.step("Step 2: Click on 'User' selection", async () => {
      await admin_userManagementPage.selectOptionUsers();
    });

    await test.step("Step 3: Verify that 'User' page is display", async () => {
      await expect(adminPage.txtAdminPageTitle.getElement()).toBeVisible();
      await expect(adminPage.formSystemUserFilter.getElement()).toBeVisible();
      await expect(adminPage.tableSystemUser.getElement()).toBeVisible();
    });
  });
});
