import { MenuPage } from '@pages/menu.page';
import { LoginPage } from '@pages/login.page';
import { LeavePage } from '@/pages/leave.page';
import { test, expect } from '@playwright/test';

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

    test(`LEV-AP-001: Verify that appling leave works successfully`, async ({page}) => {
        const leavePage = new LeavePage(page);
        const menuPage = new MenuPage(page);
        await test.step(`Step 1: Go to Leave page`, async () => {
            await menuPage.accessToMenuItem('Leave');
        })
        await test.step(`Step 2: Click on 'Apply' tab`, async () => {
            await leavePage.tabApply.click();
        })
        await test.step(`Step 3: Fill in leave application form`, async () => {
            await test.step(`Step 3.1: Select leave type`, async () => {
                
            })
        })
    })
})