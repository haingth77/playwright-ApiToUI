import BasePage from '@/utils/base.page';
import { ElementWrapper } from '@/utils/element.wrapper';
import { Page } from '@playwright/test';

export class MyInfoPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  btnPersonalDetails = new ElementWrapper(
    this.getPage.getByRole('link', { name: 'Personal Details' }),
    this,
  );
  btnEmergencyContacts = new ElementWrapper(
    this.getPage.getByRole('link', { name: 'Emergency Contacts' }),
    this,
  );
  btnDependents = new ElementWrapper(this.getPage.getByRole('link', { name: 'Dependents' }), this);
  btnImmigration = new ElementWrapper(
    this.getPage.getByRole('link', { name: 'Immigration' }),
    this,
  );
  btnJob = new ElementWrapper(this.getPage.getByRole('link', { name: 'Job' }), this);
  btnSalary = new ElementWrapper(this.getPage.getByRole('link', { name: 'Salary' }), this);
  btnReportTo = new ElementWrapper(this.getPage.getByRole('link', { name: 'Report-to' }), this);
  btnQualifications = new ElementWrapper(
    this.getPage.getByRole('link', { name: 'Qualifications' }),
    this,
  );
  btnMemberships = new ElementWrapper(
    this.getPage.getByRole('link', { name: 'Memberships' }),
    this,
  );

  btnAdd = new ElementWrapper(this.getPage.getByRole('button', { name: 'Add' }), this);
  btnBrowse = new ElementWrapper(this.getPage.getByText('Browse'), this);
  txtFileName = new ElementWrapper(`//div[text() = 'Browse']/following::div[1]`, this);
  btnSave = new ElementWrapper(this.getPage.getByRole('button', { name: 'Save' }), this);
}
