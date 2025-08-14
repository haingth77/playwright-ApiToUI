import { BasePage } from '@utils/base.page';
import { Page } from '@playwright/test';
import { ElementWrapper } from '@/utils/element.wrapper';

export class HelperPage extends BasePage {
    constructor(page: Page) {
        super(page)
    }

    btnAdminUserGuide = new ElementWrapper(this.getPage.getByRole('link', {name: 'Admin User Guide'}), this)
    btnEmployeeUserGuide = new ElementWrapper(this.getPage.getByRole('link', {name: 'Employee User Guide'}), this)
    btnMobileApp = new ElementWrapper(this.getPage.getByRole('link', {name: 'Mobile App'}), this)
    btnAWSGuid = new ElementWrapper(this.getPage.getByRole('link', {name: 'AWS Guide'}), this)
    btnFAQs = new ElementWrapper(this.getPage.getByRole('link', {name: 'FAQs'}), this)
}