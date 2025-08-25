import { test, expect } from '@playwright/test';
import { LoginPage } from '@pages/login.page';

test.describe(`Loggin Admin Account`, () => {
  test(`LOG-001: Verify elements of Loggin page`, async ({ page }) => {
    const loginPage = new LoginPage(page);
    await test.step('Step 1: Go to the login page', async () => {
      await loginPage.gotoHomePage();
    });

    await test.step('Step 2: Verifi elements on login page are displayed', async () => {
      await expect(loginPage.lblLogin.getElement()).toBeVisible();
      await expect(loginPage.lblUsernameInfo.getElement()).toBeVisible();
      await expect(loginPage.lblPasswordInfo.getElement()).toBeVisible();
    });
  });

  test(`LOG-002: Login Admin Account`, async ({ page }) => {
    const loginPage = new LoginPage(page);
    await test.step('Step 1: Go to the login page', async () => {
      await loginPage.gotoHomePage();
    });

    await test.step('Step 2: Login with valid credentials', async () => {
      await loginPage.login('Admin', 'admin123');
    });

    await test.step('Step 3: Verify the account name', async () => {
      await expect(loginPage.lblAccountName.getElement()).toBeVisible();
    });

    await test.step('Step 3: Verify the account name', async () => {
      await expect(loginPage.lblAccountName.getElement()).toBeVisible();
    });
  });

  test(`LOG-003: Verify that there is an error when login wrong account`, async ({ page }) => {
    const loginPage = new LoginPage(page);
    await test.step(`Step 1: Go to the login page`, async () => {
      await loginPage.gotoHomePage();
    });

    await test.step(`Step 2: Login with Invaid credentials`, async () => {
      await loginPage.login('wrong account', 'wrong password');
    });

    await test.step(`Step 3: Verify the error "Invalid crendentials" is displayed`, async () => {
      await expect(loginPage.errInvalidCredential.getElement()).toBeVisible();
    });

    await test.step(`Step 4: Verify Username and Password textbox are empty`, async () => {
      await expect(loginPage.btnUsername.getElement()).toBeEmpty();
      await expect(loginPage.btnPassword.getElement()).toBeEmpty();
    });
  });

  test(`LOG-004: Verify that Forgot password screen works when click "Forgot your password?"`, async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    await test.step('Step 1: Go to the login page', async () => {
      await loginPage.gotoHomePage();
    });

    await test.step('Step 2: Click on "Forgot your password?" button', async () => {
      await loginPage.forgotPassword();
    });

    await test.step(`Step 3: Verify 'Forgot password' is displayed`, async () => {
      await expect(loginPage.tltResetPassword.getElement()).toBeVisible();
      await expect(loginPage.btnResetPassword.getElement()).toBeEnabled();
    });
  });
});
