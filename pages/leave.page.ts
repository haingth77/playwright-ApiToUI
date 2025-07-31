import { BasePage } from '@utils/base.page';
import { Page } from '@playwright/test';
import { ElementWrapper } from '@utils/element.wrapper';
import { NotificationComponent } from '@utils/notification.component';

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
  // ddbLeaveType = new ElementWrapper(this.getPage.getByText('-- Select --'), this);
  // tbtVacation = new ElementWrapper(this.getPage.getByText('CAN - Vacation'), this)
  // timeFromDate = new ElementWrapper(this.getPage.getByText('From Date').locator)
}