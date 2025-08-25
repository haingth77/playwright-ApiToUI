import { LeavePage } from '@pages/leave.page';
import { NotificationComponent } from '@utils/notification.component';
import { test, expect } from '@fixtures/login.fixture';
import { getUrl } from '@utils/environment';
import { MenuPage } from '@/pages/menu.page';



test.describe(`Verify Leave List page`, async () => {
  test(`LEV-LL-001: Verify that 'Leave List' is default page when access to Leave page`, async ({
    loginPage,
  }) => {
    const leavePage = new LeavePage(loginPage.getPage);
    const menuPage = new MenuPage(loginPage.getPage);
    const notification = new NotificationComponent(loginPage.getPage);

    await test.step(`Step 1: Go to Leave page`, async () => {
      await menuPage.accessToMenuItem('Leave');
    })
    await test.step(`Step 2: Verify that 'Leave List' is selected as default`, async () => {
      await expect(leavePage.tabLeaveList.getElement().locator('..')).toHaveAttribute('class',/--visited/);
      await expect(loginPage.getPage).toHaveURL(`${getUrl()}/leave/viewLeaveList`);
    });

    await test.step(`Step 3: Verify that there is a popup`, async () => {
      await expect(notification.getNotificationTitle('Info').getElement()).toBeVisible();
      await expect(
        notification.getNotificationContent('No Records Found').getElement(),
      ).toBeVisible();
    });

    await test.step(`Verify that there is a popup disappeared after 5 seconds`, async () => {
      await expect(notification.getNotificationTitle('Info').getElement()).not.toBeVisible({
        timeout: 5000,
      });
      await expect(
        notification.getNotificationContent('No Records Found').getElement(),
      ).not.toBeVisible({ timeout: 5000 });
    });
  });
});
