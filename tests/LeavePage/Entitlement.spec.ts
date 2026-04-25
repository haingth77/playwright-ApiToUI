import { userLeaveInfo } from '@/data-test/leave.info';
import { LeavePage } from '@/pages/leave.page';
import { MenuPage } from '@/pages/menu.page';
import { getUrl } from '@/utils/environment';
import { NotificationComponent } from '@/utils/notification.component';
import { test, expect } from '@fixtures/login.fixture';

test.describe(`Verify Leave Entitlement page`, async () => {
  test(`LEV-EN-001: Verify that 'Add Entitlement' functionality works correctly`, async ({
    loginPage,
  }) => {
    const menuPage = new MenuPage(loginPage.getPage);
    const leavePage = new LeavePage(loginPage.getPage);
    const notification = new NotificationComponent(loginPage.getPage);
    let employeeName : string = ''
    const entitlementNumber : string = '77';
    await test.step(`Step: Go to Leave page`, async () => {
      await menuPage.accessToMenuItem('Leave');
    });

    await test.step(`Step: Click on 'Entitlements' > 'Add Entitlement' tab`, async () => {
      await leavePage.tabEntitlements.click();
      await expect(leavePage.optAddEntitlement.getElement()).toBeVisible();
      await leavePage.optAddEntitlement.click();
      await leavePage.waitForPageLoad();
      await expect(leavePage.tabEntitlements.getElement().locator('..')).toHaveAttribute(
        'class',
        /--visited/,
      );
    });

    await test.step(`Step: Select and fill information`, async () => {
      await test.step(`Step: Select 'Individual Employee' option`, async () => {
        await leavePage.optIndividualEmployee.click(true);
        await expect(leavePage.optIndividualEmployee.getElement()).toBeChecked();
      });

      await test.step(`Step: Fill 'Employee Name'`, async () => {
        await leavePage.tbxEmployeeName.input('a');
        await leavePage.waitForAPI(
          'api/v2/pim/employees?nameOrId=a&includeEmployees=currentAndPast',
          200,
          'GET',
        );
        await leavePage.ddbEmployeeName.click();
        employeeName = await leavePage.tbxEmployeeName.getElement().inputValue()
        console.log('employeeName is: ',employeeName)
      });

      await test.step(`Step: Fill 'Entitlement'`, async () => {
        await leavePage.ddbLeaveType.click();
        await expect(leavePage.tbtLeaveType.getElement()).toBeVisible();
        await leavePage.tbtLeaveType.click();

        await expect(leavePage.headerEntitlement.getElement()).toBeVisible();

        await leavePage.tbxEntitlement.input(entitlementNumber);
        await expect(leavePage.tbxEntitlement.getElement()).toHaveValue(entitlementNumber);
      });

      await test.step(`Step: Click on 'Save' button`, async () => {
        await leavePage.btnSave.click();
      });

      await test.step(`Step: Verify that 'Updating Entitlement' table is displayed`, async () => {
        await expect(leavePage.tableHeaderEntitlement.getElement()).toBeVisible();
        await leavePage.btnConfirm.click();
      });

      await test.step.skip(`Step: Verify that entitlement is updated successfully`, async () => {
        await leavePage.waitForAPI('api/v2/leave/leave-entitlements', 200, 'POST');
        await expect(notification.getNotificationTitle('Success').getElement()).toBeVisible();
        await expect(
          notification.getNotificationContent('Successfully Saved').getElement(),
        ).toBeVisible();
      });

      await test.step(`Step: Verify that navigate to 'Leave Entitlement' and entitlement is correctly`, async() => {
        await leavePage.waitForAPI('api/v2/leave/leave-periods', 200, 'GET')
        await leavePage.waitForPageLoad('domcontentloaded')
        await expect(leavePage.tbxEmployeeName.getElement()).toHaveValue(employeeName) 

        const row = leavePage.getPage.getByRole('row').filter({hasText : userLeaveInfo.leave_type})
        console.log('row is: ',await row.textContent())
        await expect(row).toHaveCount(1)
        await expect(row).toContainText(entitlementNumber)
        await expect(row).toContainText(userLeaveInfo.leave_type)

        const cells = row.getByRole('cell')
        console.log('cells is: ',await cells.allTextContents())
        console.log('cells 1 is: ',await cells.nth(1).textContent())
        console.log('cells 5 is: ',await cells.nth(5).textContent())
        await expect(cells.nth(1)).toHaveText(userLeaveInfo.leave_type)
        await expect(cells.nth(5)).toHaveText(entitlementNumber)
      })
    });
  });
});

//https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/leave/leave-periods
