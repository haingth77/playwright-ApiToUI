// package orangeHRM;

// import common.TestBase;
// import org.testng.Assert;
// import org.testng.annotations.Test;
// import page.LoginAdminAccountPage;

// import static common.Browser.*;

// public class LoginAdminAccountTest extends TestBase {
//     LoginAdminAccountPage loginAdminAccountPage;

//     @Test(dataProvider = "testData")
//     public void loginAdminAccount(String url, String username, String password) {
//         visit(url);
//         login(username, password);
//         loginAdminAccountPage = new LoginAdminAccountPage();
//         Assert.assertEquals(currentUrl(), "https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index");
//         Assert.assertTrue(loginAdminAccountPage.checkVisibilityOfWidgetCard());
//         Assert.assertTrue(loginAdminAccountPage.checkVisibilityOfDashBoardTitle());
//     }
// }

import verification from "@utils/verification";
import { test } from "@playwright/test";
import { LogUtils } from "@utils/log.utils";
import { LoginPage } from "@pages/login.page";
import { log } from "console";

test.describe(`Loggin Admin Account`, () => {
  test(`LOG-001: Verify elements of Loggin page`, async({page}) => {
    const loginPage = new LoginPage(page)
    LogUtils.logStep("Step 1: Go to the login page")
    await loginPage.gotoHomePage()

    LogUtils.logStep("Step 2: Verifi elements on login page are displayed")
    await loginPage.lblLogin.isDisplayed()
    await loginPage.lblUsernameInfo.isDisplayed()
    await loginPage.lblPasswordInfo.isDisplayed()
  })

  test(`LOG-002: Login Admin Account`, async ({ page }) => {
    const loginPage = new LoginPage(page);
    LogUtils.logStep("Step 1: Go to the login page");
    await loginPage.gotoHomePage();

    LogUtils.logStep("Step 2: Login with valid credentials");
    await loginPage.login("Admin", "admin123");

    await loginPage.waitForPageLoad();

    LogUtils.logStep("Step 3: Verify the account name");
    await verification.verifyItemToBeDefined(loginPage.lblAccountName.getElement());
  });

  test(`LOG-003: Verify that there is an error when login wrong account`, async({page}) => {
    const loginPage = new LoginPage(page)
    LogUtils.logStep(`Step 1: Go to the login page`)
    await loginPage.gotoHomePage()

    LogUtils.logStep(`Step 2: Login with Invaid credentials`)
    await loginPage.login("wrong account", "wrong password")

    LogUtils.logStep(`Step 3: Verify the error "Invalid crendentials" is displayed`)
    await loginPage.errInvalidCredential.isDisplayed()

    LogUtils.logStep(`Step 4: Verify Username and Password textbox are empty`)
    await verification.verifyEqualItem(await loginPage.btnUsername.inputValue(), '')
    await verification.verifyEqualItem(await loginPage.btnPassword.inputValue(), '')
  })

  test(`LOG-004: Verify that Forgot password screen works when click "Forgot your password?"`, async({page}) => {
    const loginPage = new LoginPage(page)
    LogUtils.logStep('Step 1: Go to the login page')
    await loginPage.gotoHomePage()

    LogUtils.logStep('Step 2: Click on "Forgot your password?" button')
    await loginPage.forgotPassword()

    LogUtils.logStep(`Step 3: Verify 'Forgot password' is displayed`)
    await loginPage.tltResetPassword.isDisplayed()
    await loginPage.btnResetPassword.IsEnable()
  })
});
