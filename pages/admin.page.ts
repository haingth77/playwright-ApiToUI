import { BasePage } from "@/utils/base.page";
import { ElementWrapper } from "@/utils/element.wrapper";
import { Page } from "@playwright/test";

export class AdminPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  btnAdminPageButton = new ElementWrapper(
    `//li[@class="oxd-main-menu-item-wrapper"]/a/span[text()="Admin"]`,
    this
  );
  formSystemUserFilter = new ElementWrapper(
    "//div[@class='orangehrm-background-container']/div[@class='oxd-table-filter']",
    this
  );
  tableSystemUser = new ElementWrapper(
    "//div[@class='orangehrm-background-container']/div[@class='orangehrm-paper-container']",
    this
  );
  txtAdminPageTitle = new ElementWrapper(
    `//div[@class='oxd-topbar-header-title']/span/h6[text()='Admin']`, this
  );
  ddboxJob = new ElementWrapper(`//li[contains(@class, "topbar-body")]/span[normalize-space() = 'Job']`, this)
  dditemJobTitles = new ElementWrapper(`//ul[@role='menu']//li//a[text() = 'Job Titles']`, this)
  dditemPayGrades = new ElementWrapper(`//ul[@role='menu']//li//a[text() = 'Pay Grades']`, this)
  dditemEmploymentStatus = new ElementWrapper(`//ul[@role='menu']//li//a[text() = 'Employment Status']`, this)
  dditemJobCategories = new ElementWrapper(`//ul[@role='menu']//li//a[text() = 'Job Categories']`, this)
  dditemWorkShifts = new ElementWrapper(`//ul[@role='menu']//li//a[text() = 'Work Shifts']`, this)

  ddboxOrganization = new ElementWrapper(`//li[contains(@class, "topbar-body")]/span[normalize-space() = 'Organization']`, this)
  ddboxQualifications = new ElementWrapper(`//li[contains(@class, "topbar-body")]/span[normalize-space() = 'Qualifications']`, this)
  ddboxNationalities = new ElementWrapper(`//li[contains(@class, "topbar-body")]/span[normalize-space() = 'Nationalities']`, this)
  ddboxMore = new ElementWrapper(`//li[contains(@class, "topbar-body")]/span[normalize-space() = 'More']`, this)

  public async gotoAdminPage() {
    await this.btnAdminPageButton.click();
    await this.waitForPageLoad();
  }
}
