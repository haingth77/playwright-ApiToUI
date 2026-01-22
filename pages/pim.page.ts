import { BasePage } from '@utils/base.page';
import { Page } from '@playwright/test';
import { ElementWrapper } from '@utils/element.wrapper';
import { NotificationComponent } from '@utils/notification.component';
import { UserInfo } from '@utils/interface.type';

export class PIMPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  tabEmployeeList = new ElementWrapper(
    this.getPage.getByRole('link', { name: 'Employee List' }),
    this,
  );
  tabConfiguration = new ElementWrapper(
    this.getPage.getByRole('link', { name: 'Configuration' }),
    this,
  );
  tabAddEmployee = new ElementWrapper(
    this.getPage.getByRole('link', { name: 'Add Employee' }),
    this,
  );
  tabReports = new ElementWrapper(this.getPage.getByRole('link', { name: 'Reports' }), this);

  btnAdd = new ElementWrapper(this.getPage.getByRole('button', { name: 'Add' }), this);
  tbxFirstName = new ElementWrapper(this.getPage.getByPlaceholder('First Name'), this);
  tbxMiddleName = new ElementWrapper(this.getPage.getByPlaceholder('Middle Name'), this);
  tbxLastName = new ElementWrapper(this.getPage.getByPlaceholder('Last Name'), this);
  tbxEmployeeId = new ElementWrapper(
    `//label[contains(text(), 'Employee Id')]/following::input[1]`,
    this,
  );
  ckbCreateLoginDetails = new ElementWrapper(this.getPage.getByRole('checkbox'), this);
  tbxUserName = new ElementWrapper(
    `//label[contains(text(), 'Username')]/following::input[1]`,
    this,
  );
  tbxPassword = new ElementWrapper(
    `//label[normalize-space(text()) = 'Password']/following::input[1]`,
    this,
  );
  tbxConfirmPassword = new ElementWrapper(
    `//label[contains(text(), 'Confirm Password')]/following::input[1]`,
    this,
  );
  btnSave = new ElementWrapper(this.getPage.getByText('Save'), this);
  btnSearch = new ElementWrapper(this.getPage.getByText('Search'), this);
  btnDelete = new ElementWrapper(`//button//i[contains(@class, 'trash')]`, this);
  btnConfirmDelete = new ElementWrapper(
    this.getPage.getByRole('button', { name: 'Yes, Delete' }),
    this,
  );
  tableEmployeeList = new ElementWrapper(this.getPage.locator(`[role='rowgroup'][class='oxd-table-body']`), this)
  txtEmployeeId = new ElementWrapper(this.tableEmployeeList.getElement().locator(`[class='oxd-table-card']`).nth(1).getByRole('row').getByRole('cell').nth(1).locator('div'), this)
  ckboxEmployee = new ElementWrapper(this.tableEmployeeList.getElement().locator(`[class='oxd-table-card']`).nth(1).getByRole('row').getByRole('cell').nth(0).locator(`//span//i[contains(@class, 'checkbox-input-icon')]`), this)
  iconTrash = new ElementWrapper(this.tableEmployeeList.getElement().locator(`[class='oxd-table-card']`).nth(1).getByRole('row').getByRole('cell').last().getByRole('button').nth(1), this)

  // Personal Details

  public async addEmployee() {
    await this.btnAdd.click();
    await this.waitForPageLoad();
  }

  public async fillNewEmployeeInfo(userInfo: UserInfo) {
    await this.tbxFirstName.input(userInfo.first_name);
    await this.tbxMiddleName.input(userInfo.middle_name);
    await this.tbxLastName.input(userInfo.last_name);
    await this.tbxEmployeeId.input(userInfo.employee_id.toString());
    await this.ckbCreateLoginDetails.getElement().locator('..').click();
    await this.tbxUserName.input(userInfo.username);
    await this.tbxPassword.input(userInfo.password);
    await this.tbxConfirmPassword.input(userInfo.password);
    await this.btnSave.click();
    await this.waitForPageLoad();
  }

  public async searchEmployeeById(employeeId: number) {
    await this.tbxEmployeeId.input(employeeId.toString());
    await this.btnSearch.click();
    await Promise.all([
      this.getPage.waitForResponse(
        (response) => response.url().includes(`api/v2/pim/employees`) && response.status() === 200,
      ),
      this.waitForPageLoad(),
    ]);
  }
}
