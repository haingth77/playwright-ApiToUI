import { LoginPage } from '@/pages/login.page'
import { MenuPage } from '@/pages/menu.page'
import { LogUtils } from '@/utils/log.utils'
import test from '@playwright/test'

test.beforeEach(async( {page} ) => {
    const loginPage = new LoginPage(page)
    LogUtils.logStep(`Step 1: Go to login page`)
    await loginPage.gotoHomePage()

    LogUtils.logStep(`Step 2: Login with valid credentials`)
    await loginPage.login('Admin','admin123')
})

test.describe(`Verify actions in PIM / Employee List`, () => {
    test(`PIM-EL-001: Verify that 'Employee List' is displayed as default when PIM page is selected`, async ({page}) => {        
        const menuPage = new MenuPage(page)
        LogUtils.logStep(`Step 3: Click on PIM menu button`)
        await menuPage.accessToMenuItem('PIM')

        await menuPage.tltEmployeeList.isDisplayed()
    })
})

