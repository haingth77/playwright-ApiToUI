import { LeavePage } from '@pages/leave.page';
import { LoginPage } from '@pages/login.page';
import { MenuPage } from '@pages/menu.page';
import { NotificationComponent } from '@utils/notification.component';
import { test, expect } from '@playwright/test';
import { getUrl } from '@utils/environment';

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  const menuPage = new MenuPage(page);
  await loginPage.gotoHomePage();
  await loginPage.login('Admin', 'admin123');
  await menuPage.accessToMenuItem('Leave');
});

test.describe(`Verify Leave List page`, async () => {
  test(`LEV-LL-001: Verify that 'Leave List' is default page when access to Leave page`, async ({
    page,
  }) => {
    const leavePage = new LeavePage(page);
    const notification = new NotificationComponent(page);
    await test.step(`Verify that 'Leave List' is selected as default`, async () => {
      await expect(leavePage.tabLeaveList.getElement().locator('..')).toHaveClass(/--visited/);
      await expect(page).toHaveURL(`${getUrl()}/leave/viewLeaveList`);
    });

    await test.step(`Verify that there is a popup`, async () => {
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
