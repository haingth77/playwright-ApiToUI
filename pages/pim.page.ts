import BasePage from '@/utils/base.page';
import { Page } from '@playwright/test';
import { ElementWrapper } from '@/utils/element.wrapper';

export interface UserInfor {
    first_name: string;
    middle_name: string
    last_name: string
    employee_id: number
    username: string
    password: string
}

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
  tbxFirstName = new ElementWrapper(this.getPage.getByPlaceholder('First Name'), this)
  tbxMiddleName = new ElementWrapper(this.getPage.getByPlaceholder('Middle Name'), this)
  tbxLastName = new ElementWrapper(this.getPage.getByPlaceholder('Last Name'), this)
  tbxEmployeeId = new ElementWrapper(this.getPage.getByPlaceholder('Employee Id'), this)

  public async addEmployee() {
    await this.btnAdd.click();
    await this.waitForPageLoad()
  }

  public async fillNewEmployeeInfo(userInfo: UserInfor) {
    await this.tbxFirstName.input(userInfo.first_name)
    await this.tbxFirstName.input(userInfo.middle_name)
    await this.tbxFirstName.input(userInfo.last_name)
    await this.tbxFirstName.input(userInfo.employee_id.toExponential.toString())

  }
}
