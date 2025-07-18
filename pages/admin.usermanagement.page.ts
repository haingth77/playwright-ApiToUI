import BasePage from "@/utils/base.page";
import { ElementWrapper } from "@/utils/element.wrapper";
import { Page } from '@playwright/test'
import { AdminPage } from "./admin.page";


export class Admin_UserManagementPage extends AdminPage {
    constructor (page: Page) {
        super (page)
    }

    ddboxUserManagement = new ElementWrapper(`//li[contains(@class, "topbar-body")]/span[normalize-space() = 'User Management']`, this)
    dditemUser = new ElementWrapper(`//ul[@role='menu']//li//a[text() = 'Users']`, this)

    public async selectOptionUsers() {
        await this.ddboxUserManagement.click()
        await this.dditemUser.click()
        await this.waitForPageLoad()
    }
}