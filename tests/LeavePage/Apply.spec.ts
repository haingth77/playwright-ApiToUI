import { MenuPage } from '@pages/menu.page';
import { LoginPage } from '@pages/login.page';
import { LeavePage } from '@pages/leave.page';
import { test, expect } from '@playwright/test';
import utilsServices from '@/utils/utils.services';
import { userLeaveInfo } from '@/data-test/leave.info';

test.describe(`Verify Apply Page`, async() => {
    test.beforeEach(async({page}) => {
         const loginPage = new LoginPage(page);
          await test.step(`Step 1: Go to login page`, async () => {
            await loginPage.gotoHomePage();
          });
        
          await test.step(`Step 2: Login with valid credentials`, async () => {
            await loginPage.login('Admin', 'admin123');
          });
    })

    test(`LEV-AP-001: Verify that 'Assign Leave' works successfully`, async ({page}) => {
        const leavePage = new LeavePage(page);
        const menuPage = new MenuPage(page);
        await test.step(`Step 1: Go to Leave page`, async () => {
            await menuPage.accessToMenuItem('Leave');
        })
        await test.step(`Step 2: Click on 'Apply' tab`, async () => {
            await leavePage.tabAssignLeave.click();
        })
        await test.step(`Step 3: Fill in leave application form`, async () => {
            await test.step(`Step 3.1: Select employee name`, async () => {
                await leavePage.tbxEmployeeName.input('a');
                await leavePage.waitForAPI('api/v2/pim/employees', 200, 'GET');
                await leavePage.ddbEmployeeName.click();
            })
            await test.step(`Step 3.2: Select leave type`, async () => {
                await leavePage.ddbLeaveType.click();
                await leavePage.tbtLeaveType.click();
            })
            await test.step(`Step 3.3: Select 'from date' and 'to date'`, async () => {
                await leavePage.timeFromDate.click()
                await leavePage.fillTime(utilsServices.getDayMonthYear(userLeaveInfo.from_date))
                await leavePage.timeToDate.click()
                await leavePage.fillTime(utilsServices.getDayMonthYear(userLeaveInfo.to_date))
            })
        })
    })
})