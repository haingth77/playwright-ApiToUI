import { Locator, expect } from '@playwright/test';
import { BasePage } from '@/utils/base.page';

export class ElementWrapper {
  private _locator!: Locator;
  private _basePage!: BasePage;

  constructor(locator: string | Locator, basePage: BasePage) {
    if (typeof locator === 'string') {
      this._locator = basePage.getPage.locator(locator);
    } else {
      this._locator = locator;
    }
    this._basePage = basePage;
  }

  public getElement() {
    // let element =
    return this._locator;
  }

  public async getAttribute(attribute: string) {
    return await this.getElement().getAttribute(attribute);
  }

  public async input(content: string) {
    await this.getElement().clear({ force: true });
    await this.getElement().fill(content, { force: true });
  }

  public async click(force = false) {
    let retry = 0;

    while (retry !== 3) {
      try {
        await this.getElement().click({ force: force, timeout: 60000 });
        retry = 3;
      } catch (error) {
        if (
          error instanceof Error &&
          (error.message.includes('Element is outside') ||
            error.message.includes('Element is not visible'))
        ) {
          await this._basePage.reloadPage();
          await this._basePage.waitForPageLoad();
          retry++;
        } else {
          throw error;
        }
      }
    }
  }

  public async check() {
    await this.getElement().check({ force: true, timeout: 60000 });
  }
  public async checkByClick(force = false) {
    let isChecked = await this.getElement().isChecked();

    if (!isChecked) {
      await this.getElement().click({ force: force, timeout: 60000 });
    }
  }
  public async uncheckByClick(force = false) {
    let isChecked = await this.getElement().isChecked();

    if (isChecked) {
      await this.getElement().click({ force: force, timeout: 60000 });
    }
  }

  public async uncheck() {
    await this.getElement().uncheck({ force: true, timeout: 60000 });
  }

  public async waitForElementDisplay() {
    await this.getElement().waitFor({ state: 'visible', timeout: 60000 });
  }

  public async waitForElementNotDisplay() {
    await this.getElement().waitFor({ state: 'hidden', timeout: 60000 });
  }

  public async getText() {
    return await this.getElement().textContent();
  }

  public async inputValue() {
    return await this.getElement().inputValue();
  }

  public async setInputFiles(path: string | string[]) {
    return await this.getElement().setInputFiles(path);
  }

  // validations
  public async IsEnable() {
    const element = this.getElement();
    await expect(element).toBeEnabled({ timeout: 120_000 });
  }

  public async isDisplayed() {
    const element = this.getElement();
    await expect(element).toBeVisible({ timeout: 120000 });
  }

  public async isNotDisplayed() {
    await expect(this.getElement()).toBeHidden({ timeout: 120000 });
  }

  public async isDisplayedTF() {
    return await this.getElement().isVisible({ timeout: 120000 });
  }

  public async uploadFileName(filename: string | string[]) {
    await this.getElement().setInputFiles(filename);
  }
}
