import { LoginPage } from '@/pages/login.page';
import { MenuPage } from '@/pages/menu.page';
import { PIMPage } from '@/pages/pim.page';
import { getUrl } from '@/utils/environment';
import { test, expect } from '@playwright/test';
import {UserInfor} from '@pages/pim.page'

const userTest : UserInfor = {
    first_name: 'first77',
    middle_name: 'middle77',
    last_name: 'last77',
    employee_id: 7799,
    username: 'test7799',
    password: 'password77'
}

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await test.step(`Step 1: Go to login page`, async () => {
    await loginPage.gotoHomePage();
  });

  await test.step(`Step 2: Login with valid credentials`, async () => {
    await loginPage.login('Admin', 'admin123');
  });
});

test.describe(`Verify actions in PIM / Employee List`, () => {
  test(`PIM-EL-001: Verify that 'Employee List' is displayed as default when PIM page is selected`, async ({
    page,
  }) => {
    const menuPage = new MenuPage(page);
    const pimPage = new PIMPage(page);
    await test.step(`Step 3: Click on PIM menu button`, async () => {
      await menuPage.accessToMenuItem('PIM');
    });

    await test.step(`Step 4: Verify that Employee List is displayed as default`, async () => {
      await expect(pimPage.tabEmployeeList.getElement().locator('..')).toHaveClass(/--visited/);
      await expect(page).not.toHaveURL(`${getUrl()}/pim/viewEmployeeList`);
    });
  });

  test(`PIM-EL-002: Verify that 'Add' new user work successfully`, async ({ page }) => {
    const menuPage = new MenuPage(page);
    const pimPage = new PIMPage(page);
    await test.step(`Step 3: Click on PIM menu button`, async () => {
      await menuPage.accessToMenuItem('PIM');
    });

    await test.step(`Step 4: Click on 'Add' button`, async () => {
        await pimPage.addEmployee()
    })

    await test.step(`Step 5: Fill user information`, async () => {
        await pimPage.fillNewEmployeeInfo(userTest)
    })
  });
});
