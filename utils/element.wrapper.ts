import { Locator, expect } from '@playwright/test';
import { BasePage } from '@utils/base.page';

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
    return this._locator;
  }

  public async getAttribute(attribute: string) {
    return await this.getElement().getAttribute(attribute);
  }

  public async input(content: string, force = false) {
    await this.getElement().clear({ force: force, timeout: 60000 });
    await this.getElement().fill(content, { force: force, timeout: 60000 });
  }

  public async click(force = false) {
    try {
      // First, try to scroll element into view if it's outside viewport
      await this.getElement().scrollIntoViewIfNeeded();

      // Wait for element to be visible and stable
      await this.getElement().waitFor({
        state: 'visible',
        timeout: 15000,
      });

      // Perform the click with reasonable timeout
      await this.getElement().click({ force: force, timeout: 30000 });
    } catch (error) {
      // Only retry for specific, recoverable errors
      if (
        error instanceof Error &&
        (error.message.includes('Element is outside') ||
          error.message.includes('Element is not visible'))
      ) {
        console.log(`Click failed, retrying: ${error.message}`);

        // Wait for any animations/transitions to complete
        await this._basePage.getPage.waitForTimeout(2000);

        // Retry once with scroll and wait
        await this.getElement().scrollIntoViewIfNeeded();
        await this.getElement().waitFor({
          state: 'visible',
          timeout: 10000,
        });
        await this.getElement().click({ force: force, timeout: 15000 });
      } else {
        throw error;
      }
    }
  }

  public async check(force = false) {
    // Usually don't need force: true for checkboxes
    // Let Playwright ensure element is actionable first
    await this.getElement().check({ force: force, timeout: 60000 });
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

  public async uncheck(force = false) {
    await this.getElement().uncheck({ force: force, timeout: 60000 });
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
