import { MyInfoPage } from '@/pages/my.info.page';
import { NotificationComponent } from '@/utils/notification.component';
import utilsServices from '@/utils/utils.services';
import { test, expect } from '@fixtures/login.fixture';
import { MenuPage } from '@pages/menu.page';
import path from 'path';

const fileName = 'meow.png';

test.describe(`Verify My Info/ Personal Details page`, async () => {
  test(`MI-PD-001: Verify that upload file is successful`, async ({ loginPage }) => {
    const menuPage = new MenuPage(loginPage.getPage);
    const myInfoPage = new MyInfoPage(loginPage.getPage);
    const notification = new NotificationComponent(loginPage.getPage);
    const filePath = path.join(process.cwd(), `data-test/${fileName}`);
    await test.step(`Step 1: Navigate to My Info page`, async () => {
      await menuPage.accessToMenuItem('My Info');
    });
    await test.step(`Step 2: Click on Personal Details`, async () => {
      await myInfoPage.btnPersonalDetails.click();
    });
    await test.step(`Step 3: Upload file`, async () => {
      await myInfoPage.btnAdd.click();
      await expect(myInfoPage.txtFileName.getElement()).toContainText('No file selected');
      await myInfoPage.inputFile.getElement().setInputFiles(filePath);
      await myInfoPage.getPage.waitForTimeout(100);
      await expect(myInfoPage.txtFileName.getElement()).toContainText(fileName);
    });

    await test.step(`Step 4: Click 'Save' button`, async () => {
      await myInfoPage.btnSaveList.getElement().nth(2).click();
    });

    await test.step(`Step 5: Verify that 'Successfully Saved' message is displayed`, async () => {
      await myInfoPage.waitForAPI('screen/personal/attachments', 200, 'POST');
      await expect(notification.getNotificationTitle('Success').getElement()).toBeVisible();
      await expect(
        notification.getNotificationContent('Successfully Saved').getElement(),
      ).toBeVisible();
    });

    await test.step(`Step 6: Verify that file is uploaded successfully`, async () => {
      await expect(myInfoPage.tableAttachmentBody.getElement()).toBeVisible();
      await expect(myInfoPage.rowAttachmentLast.getElement()).toBeVisible();
      await myInfoPage.getPage.waitForTimeout(1000);
      await expect(myInfoPage.txtAttachmentLastRow.getElement()).toBeVisible();
      await expect(myInfoPage.txtAttachmentLastRow.getElement()).toContainText(fileName);
    });
  });
});
