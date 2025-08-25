import { MenuPage } from '@pages/menu.page';
import { PIMPage } from '@pages/pim.page';
import { getUrl } from '@utils/environment';
import { test, expect } from '@fixtures/login.fixture';
import { NotificationComponent } from '@utils/notification.component';
import { userTest } from '@data-test/user.info';

test.describe(`Verify actions in PIM / Employee List`, () => {
  test(`PIM-EL-001: Verify that 'Employee List' is displayed as default when PIM page is selected`, async ({
    loginPage,
  }) => {
    const menuPage = new MenuPage(loginPage.getPage);
    const pimPage = new PIMPage(loginPage.getPage);
    await test.step(`Step 1: Click on PIM menu button`, async () => {
      await menuPage.accessToMenuItem('PIM');
    });

    await test.step(`Step 2: Verify that Employee List is displayed as default`, async () => {
      await expect(pimPage.tabEmployeeList.getElement().locator('..')).toHaveClass(/--visited/);
      await expect(loginPage.getPage).toHaveURL(`${getUrl()}/pim/viewEmployeeList`);
    });
  });

  test(`PIM-EL-002: Verify that 'Add' new user work successfully`, async ({ loginPage }) => {
    const menuPage = new MenuPage(loginPage.getPage);
    const pimPage = new PIMPage(loginPage.getPage);
    const notification = new NotificationComponent(loginPage.getPage);
    await test.step(`Step 1: Click on PIM menu button`, async () => {
      await menuPage.accessToMenuItem('PIM');
    });

    await test.step(`Step 2: Click on 'Add' button`, async () => {
      await pimPage.addEmployee();
    });

    await test.step(`Step 3: Fill user information`, async () => {
      await pimPage.fillNewEmployeeInfo(userTest);
    });

    await test.step(`Step 4: Verify that user information is filled successfully`, async () => {
      await pimPage.waitForAPI('api/v2/pim/employees', 200, 'POST');
      await expect(notification.getNotificationTitle('Success').getElement()).toBeVisible();
      await expect(
        notification.getNotificationContent('Successfully Saved').getElement(),
      ).toBeVisible();
      await pimPage.waitForAPI('api/v2/pim/employees', 200, 'GET');
    });

    await test.step(`Step 5: Navigate to Employee List page`, async () => {
      await menuPage.accessToMenuItem('PIM');
    });

    await test.step(`Step 6: Search employee by ID`, async () => {
      await pimPage.searchEmployeeById(userTest.employee_id);
      await Promise.all([
        pimPage.waitForAPI('api/v2/pim/employees', 200, 'GET'),
        pimPage.waitForPageLoad(),
      ]);
    });

    await test.step(`Step 7: Verify that employee information is displayed correctly`, async () => {
      await expect(
        pimPage.getPage.getByText(`${userTest.first_name} ${userTest.middle_name}`),
      ).toBeVisible();
      await expect(
        pimPage.getPage.getByText(userTest.employee_id.toString(), { exact: true }),
      ).toBeVisible();
      await expect(pimPage.getPage.getByText(userTest.last_name)).toBeVisible();
    });

    await test.step(`Step 8: Click on 'Delete' button`, async () => {
      await pimPage.btnDelete.click();
      await pimPage.btnConfirmDelete.click();
      await pimPage.waitForAPI('api/v2/pim/employees', 200, 'DELETE');
      await expect(notification.getNotificationTitle('Success').getElement()).toBeVisible();
      await expect(
        notification.getNotificationContent('Successfully Deleted').getElement(),
      ).toBeVisible();

      await pimPage.waitForAPI('api/v2/pim/employees', 200, 'GET');
      await expect(notification.getNotificationTitle('Info').getElement()).toBeVisible();
      await expect(
        notification.getNotificationContent('No Records Found').getElement(),
      ).toBeVisible();
    });

    await test.step(`Step 9: Verify that employee information is deleted successfully`, async () => {
      await pimPage.searchEmployeeById(userTest.employee_id);
      await expect(
        pimPage.getPage.getByText(`${userTest.first_name} ${userTest.middle_name}`),
      ).not.toBeVisible();
      await expect(
        pimPage.getPage.getByText(userTest.employee_id.toString(), { exact: true }),
      ).not.toBeVisible();
    });
  });
});
