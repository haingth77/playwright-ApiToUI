import { AdminPage } from '@/pages/admin.page';
import { Admin_UserManagementPage } from '@/pages/admin.usermanagement.page';
import { LoginPage } from '@/pages/login.page';
import { LogUtils } from '@/utils/log.utils';
import { test } from '@playwright/test'

test.describe(`User Management in Admin page`, async() => {
    test(`AUM-001: Verify that 'Users' is displayed when 'User' is selected`, async({page}) => {
        const loginPage = new LoginPage(page) 
        LogUtils.logStep("Step 1: Go to the login page");
            await loginPage.gotoHomePage();
        
            LogUtils.logStep("Step 2: Login with valid credentials");
            await loginPage.login("Admin", "admin123");
        
            const adminPage = new AdminPage(page);
            LogUtils.logStep("Step 3: Navigate to Admin Page");
            await adminPage.gotoAdminPage();

            LogUtils.logStep("Step 4: Click on 'User' selection")
            const admin_userManagementPage = new Admin_UserManagementPage(page)
            await admin_userManagementPage.selectOptionUsers()

            LogUtils.logStep("Step 5: Verify that 'User' page is display")
            await adminPage.txtAdminPageTitle.isDisplayed()
    await adminPage.formSystemUserFilter.isDisplayed()
    await adminPage.tableSystemUser.isDisplayed()

    })
})