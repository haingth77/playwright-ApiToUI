import { BasePage } from '@utils/base.page';
import { Page } from '@playwright/test';
import { ElementWrapper } from '@utils/element.wrapper';

const menuItemList: string[] = [
  'Admin',
  'PIM',
  'Leave',
  'Time',
  'Recruitment',
  'My Info',
  'Performance',
  'Dashboard',
  'Directory',
  'Maintenance',
  'Claim',
  'Buzz',
] as const;
type MenuList = (typeof menuItemList)[number];

export class MenuPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  btnOpenMenu = new ElementWrapper(`//button[contains(@class, 'main-menu-button')]`, this);
  statusOpenMenu = this.btnOpenMenu.getElement().locator(`//i`);
  txtboxSearch = new ElementWrapper(`//input[@placeholder='Search']`, this);
  btnMenuAdmin = new ElementWrapper(
    `//li[@class='oxd-main-menu-item-wrapper']/a/span[text() = 'Admin']`,
    this,
  );
  btnMenuPIM = new ElementWrapper(
    `//li[@class='oxd-main-menu-item-wrapper']/a/span[text() = 'PIM']`,
    this,
  );
  btnMenuLeave = new ElementWrapper(
    `//li[@class='oxd-main-menu-item-wrapper']/a/span[text() = 'Leave']`,
    this,
  );
  btnMenuTime = new ElementWrapper(
    `//li[@class='oxd-main-menu-item-wrapper']/a/span[text() = 'Time']`,
    this,
  );
  btnMenuRecruitment = new ElementWrapper(
    `//li[@class='oxd-main-menu-item-wrapper']/a/span[text() = 'Recruitment']`,
    this,
  );
  btnMenuMyInfo = new ElementWrapper(
    `//li[@class='oxd-main-menu-item-wrapper']/a/span[text() = 'My Info']`,
    this,
  );
  btnMenuPerformance = new ElementWrapper(
    `//li[@class='oxd-main-menu-item-wrapper']/a/span[text() = 'Performance']`,
    this,
  );
  btnMenuDashboard = new ElementWrapper(
    `//li[@class='oxd-main-menu-item-wrapper']/a/span[text() = 'Dashboard']`,
    this,
  );
  btnMenuDirectory = new ElementWrapper(
    `//li[@class='oxd-main-menu-item-wrapper']/a/span[text() = 'Directory']`,
    this,
  );
  btnMenuMaintenance = new ElementWrapper(
    `//li[@class='oxd-main-menu-item-wrapper']/a/span[text() = 'Maintenance']`,
    this,
  );
  btnMenuClaim = new ElementWrapper(
    `//li[@class='oxd-main-menu-item-wrapper']/a/span[text() = 'Claim']`,
    this,
  );
  btnMenuBuzz = new ElementWrapper(
    `//li[@class='oxd-main-menu-item-wrapper']/a/span[text() = 'Buzz']`,
    this,
  );
  btnHelper = new ElementWrapper(this.getPage.getByRole('button', { name: 'Helper' }), this);

  clickMenu: Record<MenuList, () => Promise<void>> = {
    Admin: async () => {
      await this.btnMenuAdmin.click();
    },
    PIM: async () => {
      await this.btnMenuPIM.click();
    },
    Leave: async () => {
      await this.btnMenuLeave.click();
    },
    Time: async () => {
      await this.btnMenuTime.click();
    },
    Recruitment: async () => {
      await this.btnMenuRecruitment.click();
    },
    'My Info': async () => {
      await this.btnMenuMyInfo.click();
    },
    Performance: async () => {
      await this.btnMenuPerformance.click();
    },
    Dashboard: async () => {
      await this.btnMenuDashboard.click();
    },
    Directory: async () => {
      await this.btnMenuDirectory.click();
    },
    Maintenance: async () => {
      await this.btnMenuMaintenance.click();
    },
    Claim: async () => {
      await this.btnMenuClaim.click();
    },
    Buzz: async () => {
      await this.btnMenuBuzz.click();
    },
  };

  public async isMenuOpen(): Promise<boolean> {
    const status = await this.statusOpenMenu.getAttribute('class');
    if (status && status.includes('right')) {
      return false;
    } else if (status && status.includes('left')) {
      return true;
    }
    return false;
  }

  public async accessToMenuItem(menuItem: MenuList) {
    const isMenuOpen = await this.isMenuOpen();
    if (!isMenuOpen) {
      await this.btnOpenMenu.click();
    }
    await this.clickMenu[menuItem]();
    await this.waitForPageLoad();
  }
}
