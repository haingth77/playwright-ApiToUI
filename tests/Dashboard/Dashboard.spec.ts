import { test, expect } from '@fixtures/login.fixture';
import { DashboardPage } from '@/pages/dashboard.page';
import { log } from 'console';
import { MenuPage } from '@/pages/menu.page';
import { ElementWrapper } from '@/utils/element.wrapper';

test.describe(`Verify Dashboard page`, async () => {
  test(`DSB-001: Verify that Employee Distribution chart displays correct number (tooltip)`, async ({
    loginPage,
  }) => {
    const dashboardPage = new DashboardPage(loginPage.getPage);
    const menuPage = new MenuPage(loginPage.getPage);

    await test.step(`Step 1: Navigate to Dashboard page`, async () => {
      await menuPage.accessToMenuItem('Dashboard');
    });

    await test.step(`Step 2: Select 'Unassigned' in Employee Distribution chart`, async () => {
      await dashboardPage.waitForTimeout(5);
      await dashboardPage.undisplayEmployeeDistributionBy(
        dashboardPage.txtEmployeeDistributionByUnit,
      );

      await test.step(`Step 3: Get amount of Unassigned employees by tooltip`, async () => {
        await expect(dashboardPage.canvasEmployeeDistributionByUnit.getElement()).toBeVisible();
        await dashboardPage.canvasEmployeeDistributionByUnit.hoverCanvas();
        await dashboardPage.tooltip.waitForElementDisplay();
        console.log('tooltip is: ', await dashboardPage.tooltip.textContent());
        console.log
      });
    });
  });
});
