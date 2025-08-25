import { Page } from "@playwright/test";
import { ElementWrapper } from "./element.wrapper";

export class UtilsServices {
  public async sanitizeFilename(filename: string) {
    return filename.replace(/[^a-zA-Z0-9]/g, "-");
  }

  public delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  public getDayMonthYear(date: string) {
    const day = date.split('-')[2]
    const month = date.split('-')[1]
    const year = date.split('-')[0]
    return {day, month, year}
  }

  public async uploadFile(page: Page, filePath: string) {
    const fileChooserPromise = page.waitForEvent('filechooser')
    const fileChooser = await fileChooserPromise
    await fileChooser.setFiles(filePath)
  }
}
export default new UtilsServices();
