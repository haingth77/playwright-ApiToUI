import { Page } from '@playwright/test';
import * as path from 'path';
import * as fs from 'fs';
import utilsServices from './utils.services';
import { ElementWrapper } from './element.wrapper';

export class BasePage {
  private _page: Page;
  constructor(page: Page) {
    this._page = page;
  }

  public get getPage() {
    return this._page;
  }

  public async locator(locator: string) {
    return this._page.locator(locator);
  }

  public async goto(url: string) {
    return await this._page.goto(url);
  }

  public async waitForTimeout(seconds: number) {
    await this._page.waitForTimeout(seconds * 1000);
  }

  public async pressKeyborad(keyboard: string) {
    await this._page.keyboard.press(keyboard);
  }

  public async waitForPageLoad(
    state: 'load' | 'domcontentloaded' | 'networkidle' = 'domcontentloaded',
  ) {
    await this._page.waitForLoadState(state);
  }

  public async waitForAPI(
    uri: string,
    status: number,
    method?: 'POST' | 'GET' | 'PUT' | 'DELETE' | 'PATCH',
  ) {
    return await this._page.waitForResponse(
      (response) =>
        response.url().includes(uri) &&
        response.status() === status &&
        (method ? response.request().method() === method : true),
    );
  }

  public async waitForFileChooserEvent() {
    return await this._page.waitForEvent('filechooser');
  }

  public async reloadPage() {
    await this._page.reload();
  }

  public async logTitle() {
    console.log(await this._page.title());
  }

  public async takeScreenshot(name?: string) {
    const screenshotsDir = path.resolve('screenshots');
    if (!fs.existsSync(screenshotsDir)) {
      fs.mkdirSync(screenshotsDir, { recursive: true });
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const sanitizedName = await utilsServices.sanitizeFilename(name || '');
    const filename = `${sanitizedName}-${timestamp}.png`;
    const filepath = path.join(screenshotsDir, filename);

    await this._page.screenshot({ path: filepath, fullPage: true });
    console.log(`Screenshot saved: ${filepath}`);
  }

  public async handleOptionalPopup(
    popupElement: ElementWrapper,
    buttonElement: ElementWrapper,
    timeout: number = 3000,
  ): Promise<boolean> {
    try {
      await popupElement.getElement().waitFor({ state: 'visible', timeout });
      await buttonElement.click();

      // Wait for popup to disappear
      await popupElement.getElement().waitFor({ state: 'hidden', timeout: 5000 });
      return true;
    } catch (error) {
      return false;
    }
  }
}

export default BasePage;
