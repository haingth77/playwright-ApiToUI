import { BasePage } from '@utils/base.page';
import { Page } from '@playwright/test';
import { ElementWrapper } from '@utils/element.wrapper';
import { userLeaveInfo } from '@data-test/leave.info';
import { LeaveInfo } from '@/utils/interface.type';
import utilsServices from '@/utils/utils.services';

const dateFromString = utilsServices.getDayMonthYear(userLeaveInfo.from_date)
const dateToString = utilsServices.getDayMonthYear(userLeaveInfo.to_date)

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
  tbxEmployeeName = new ElementWrapper(this.getPage.locator('div', {hasText: 'Employee Name'}).getByPlaceholder('Type for hints...'), this)
  ddbEmployeeName = new ElementWrapper(this.getPage.getByRole('listbox').getByRole('option').first(), this)
  ddbLeaveType = new ElementWrapper(this.getPage.getByText('-- Select --'), this);
  tbtLeaveType = new ElementWrapper(this.getPage.getByText(userLeaveInfo.leave_type), this)
  timeFromDate = new ElementWrapper(this.getPage.locator('div', {hasText: 'From Date'}).getByPlaceholder('placeholder'), this)
  timeToDate = new ElementWrapper(this.getPage.locator('div', {hasText: 'To Date'}).getByPlaceholder('placeholder'), this)
  btnYear = new ElementWrapper(`//li[contains(@class, 'calendar-selector-year')]`, this)
  btnMonth = new ElementWrapper(`//li[contains(@class, 'calendar-selector-month')]`, this)
//   tbxDay = new ElementWrapper(this.getPage.getByRole('generic', {name: getDayMonthYear(userLeaveInfo.from_date).day}), this)
//   tbxMonth = new ElementWrapper(this.getPage.getByText(getDayMonthYear(userLeaveInfo.from_date).month), this)
//   tbxYear = new ElementWrapper(this.getPage.getByText(getDayMonthYear(userLeaveInfo.from_date).year), this)

  public async fillTime(date: {day: string, month: string, year: string}) {
    await this.getPage.getByRole('generic', {name: date.day}).click()
    await this.getPage.getByRole('generic', {name: date.month}).click()
    await this.getPage.getByRole('generic', {name: date.year}).click()
  }
}