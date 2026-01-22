import { BasePage } from '@utils/base.page';
import { Page } from '@playwright/test';
import { ElementWrapper } from '@/utils/element.wrapper';

export class DashboardPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  txtEmployeeDistributionByUnit = new ElementWrapper(
    this.getPage.getByText(`Employee Distribution by Sub Unit`, { exact: true }),
    this,
  );
  chartEmployeeDistributionByUnit = new ElementWrapper(
    this.txtEmployeeDistributionByUnit.getElement().locator('..').locator('..').locator('..'),
    this,
  );
  canvasEmployeeDistributionByUnit = new ElementWrapper(
    this.chartEmployeeDistributionByUnit.getElement().locator(`//canvas`),
    this,
  );
  tooltip = new ElementWrapper(this.getPage.locator(`//span[contains(@class, 'tooltip')]`), this);

  public async undisplayEmployeeDistributionBy(chartName: ElementWrapper) {
    const chartNameTitle = await chartName.textContent();
    const chart = new ElementWrapper(
      this.getPage
        .getByText(`${chartNameTitle}`, { exact: true })
        .locator('..')
        .locator('..')
        .locator('..'),
      this,
    );
    const chartUnitList = chart.getElement().locator(`//ul//li`);

    for (let i = 0, unit = await chartUnitList.count(); i < unit - 1; i++) {
      console.log('unit is: ', await chartUnitList.nth(i).textContent());
      await chartUnitList.nth(i).click();
    }
  }
}
