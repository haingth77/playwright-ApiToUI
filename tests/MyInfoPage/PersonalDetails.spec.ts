import { MyInfoPage } from '@/pages/my.info.page';
import { NotificationComponent } from '@/utils/notification.component';
import utilsServices from '@/utils/utils.services';
import { test, expect } from '@fixtures/login.fixture';
import { MenuPage } from '@pages/menu.page';
import path from 'path';

test.describe(`Verify My Info/ Personal Details page`, async () => {
  test(`MI-PD-001: Verify that upload file is successful`, async ({ loginPage }) => {
    const menuPage = new MenuPage(loginPage.getPage);
    const myInfoPage = new MyInfoPage(loginPage.getPage);
    const notification = new NotificationComponent(loginPage.getPage);
    await test.step(`Step 1: Navigate to My Info page`, async () => {
      await menuPage.accessToMenuItem('My Info');
    });
    await test.step(`Step 2: Click on Personal Details`, async () => {
      await myInfoPage.btnPersonalDetails.click();
    });
    await test.step(`Step 3: Upload file`, async () => {
      const filePath = path.join(process.cwd(), 'data-test/meow.png');
      await myInfoPage.btnAdd.click();
      await expect(await myInfoPage.txtFileName.textContent()).toContain('No file selected');
      await myInfoPage.btnBrowse.click();
      await utilsServices.uploadFile(loginPage.getPage, filePath);
      await expect(myInfoPage.txtFileName.textContent()).toContain('meow.png');
    });

    await test.step(`Step 4: Click 'Save' button`, async () => {
      await myInfoPage.btnSave.click();
    });

    await test.step(`Step 5: Verify that 'Successfully Saved' message is displayed`, async () => {
      await myInfoPage.waitForAPI('screen/personal/attachments', 200, 'POST');
      await expect(notification.getNotificationTitle('Success').getElement()).toBeVisible();
      await expect(
        notification.getNotificationContent('Successfully Saved').getElement(),
      ).toBeVisible();
    });
  });
});
