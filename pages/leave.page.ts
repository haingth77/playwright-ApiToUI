import { BasePage } from '@utils/base.page';
import { Page } from '@playwright/test';
import { ElementWrapper } from '@utils/element.wrapper';
import { userLeaveInfo } from '@data-test/leave.info';
import { LeaveInfo } from '@/utils/interface.type';
import utilsServices from '@/utils/utils.services';

const dateFromString = utilsServices.getDayMonthYear(userLeaveInfo.from_date);
const dateToString = utilsServices.getDayMonthYear(userLeaveInfo.to_date);

export class LeavePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  tabApply = new ElementWrapper(this.getPage.getByRole('link', { name: 'Apply' }), this);
  tabMyLeave = new ElementWrapper(this.getPage.getByRole('link', { name: 'My Leave' }), this);
  tabEntitlements = new ElementWrapper(
    this.getPage.getByRole('link', { name: 'Entitlements' }),
    this,
  );
  tabReports = new ElementWrapper(this.getPage.getByRole('link', { name: 'Reports' }), this);
  tabConfigure = new ElementWrapper(this.getPage.getByRole('link', { name: 'Configure' }), this);
  tabLeaveList = new ElementWrapper(this.getPage.getByRole('link', { name: 'Leave List' }), this);
  tabAssignLeave = new ElementWrapper(
    this.getPage.getByRole('link', { name: 'Assign Leave' }),
    this,
  );
  tbxEmployeeName = new ElementWrapper(
    this.getPage.locator('div', { hasText: 'Employee Name' }).getByPlaceholder('Type for hints...'),
    this,
  );
  ddbEmployeeName = new ElementWrapper(
    this.getPage.getByRole('listbox').getByRole('option').first(),
    this,
  );
  ddbLeaveType = new ElementWrapper(this.getPage.getByText('-- Select --'), this);
  tbtLeaveType = new ElementWrapper(this.getPage.getByText(userLeaveInfo.leave_type), this);
  timeFromDate = new ElementWrapper(
    this.getPage
      .locator('label', { hasText: 'From Date' })
      .locator('..')
      .locator('..')
      .getByPlaceholder('yyyy-dd-mm'),
    this,
  );
  timeToDate = new ElementWrapper(
    this.getPage
      .locator('label', { hasText: 'To Date' })
      .locator('..')
      .locator('..')
      .getByPlaceholder('yyyy-dd-mm'),
    this,
  );
  btnYear = new ElementWrapper(`//li[contains(@class, 'calendar-selector-year')]`, this);
  btnMonth = new ElementWrapper(`//li[contains(@class, 'calendar-selector-month')]`, this);
  btnClear = new ElementWrapper(this.getPage.getByText('Clear'), this);
  txtRequired = new ElementWrapper(this.getPage.getByText('Required', {exact: true}), this);
  ddbPartialDays = new ElementWrapper(
    this.getPage
      .locator('label', { hasText: 'Partial Days' })
      .locator('..')
      .locator('..')
      .getByText('-- Select --'),
    this,
  );
  optAllDays = new ElementWrapper(this.getPage.getByRole('option', {name: 'All Days'}), this)
  ddbDuration = new ElementWrapper(
    this.getPage
      .locator('label', { hasText: 'Duration' })
      .locator('..')
      .locator('..')
      .getByText('-- Select --'),
    this,
  );
  optHalfDayAfternoon = new ElementWrapper(this.getPage.getByRole('option', {name: 'Half Day - Afternoon'}), this)
  tbxComment = new ElementWrapper(this.getPage.locator('textarea'), this)
  btnAssisn = new ElementWrapper(this.getPage.getByRole('button', {name: 'Assign'}), this)
  btnOK = new ElementWrapper(this.getPage.getByRole('button', {name: 'Ok'}), this)
  popupConfirmLeave = new ElementWrapper(this.getPage.getByText('Confirm Leave Assignment', {exact: true}), this)

  public async fillTime(date: { day: string; month: string; year: string }) {
    await this.btnYear.click();
    await this.getPage.getByText(date.year, { exact: true }).click();
    await this.btnMonth.click();
    await this.getPage.getByText(date.month, { exact: true }).click();
    await this.getPage.getByText(date.day, { exact: true }).click();
  }
}
