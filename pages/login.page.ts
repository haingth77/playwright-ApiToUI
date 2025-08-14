import { ElementWrapper } from '@utils/element.wrapper';
import { BasePage } from '@utils/base.page';
import { getUrl } from '@utils/environment';
import { Page } from '@playwright/test';
import { NotificationComponent } from '@utils/notification.component';

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  /**
   * Element
   */

  btnUsername = new ElementWrapper("//input[@name='username']", this);
  btnPassword = new ElementWrapper("//input[@name='password']", this);
  btnLogin = new ElementWrapper(
    "//div[@class='oxd-form-actions orangehrm-login-action']/button[@class='oxd-button oxd-button--medium oxd-button--main orangehrm-login-button']",
    this,
  );
  lblAccountName = new ElementWrapper(
    "//span[@class='oxd-userdropdown-tab']/p[@class='oxd-userdropdown-name']",
    this,
  );
  lblLogin = new ElementWrapper(`//div[@class='orangehrm-login-slot']/h5[text() = 'Login']`, this);
  lblUsernameInfo = new ElementWrapper(
    `//div[@class='orangehrm-login-form']/div/div/p[text() = 'Username : Admin' or text() = 'Username: Admin']`,
    this,
  );
  lblPasswordInfo = new ElementWrapper(
    `//div[@class='orangehrm-login-form']/div/div/p[text() = 'Password : admin123' or text() = 'Password: admin123']`,
    this,
  );
  btnForgtPassword = new ElementWrapper(
    `//div[@class ='orangehrm-login-forgot']//p[text()= 'Forgot your password? ']`,
    this,
  );

  tltResetPassword = new ElementWrapper(
    `//form[@class = 'oxd-form']//h6[text() = 'Reset Password']`,
    this,
  );
  btnResetPassword = new ElementWrapper(`//button[normalize-space() = 'Reset Password']`, this);
  errInvalidCredential = new ElementWrapper(
    `//div[@class='oxd-alert-content oxd-alert-content--error']/p[text() = 'Invalid credentials']`,
    this,
  );

  /**
   * Method
   */

  public async gotoHomePage() {
    await this.goto(getUrl());
    await this.waitForPageLoad();
  }

  public async login(username: string, password: string) {
    await this.waitForPageLoad();
    await this.btnUsername.input(username);
    await this.btnPassword.input(password);
    await this.btnLogin.click();
    await this.waitForPageLoad();
  }

  public async forgotPassword() {
    await this.btnForgtPassword.click();
    await this.waitForPageLoad();
  }
}
