import { BasePage } from "@/utils/base.page";
import { Page } from "@playwright/test";
import { ElementWrapper } from "@/utils/element.wrapper";

export class LeavePage extends BasePage {
    constructor(page: Page) {
        super(page)
    }

    tabApply = new ElementWrapper(this.getPage.getByRole("link", {name: "Apply"}), this)
    tabMyLeave = new ElementWrapper(this.getPage.getByRole("link", {name: "My Leave"}), this)
    tabEntitlements = new ElementWrapper(this.getPage.getByRole("link", {name: "Entitlements"}), this)
    tabReports = new ElementWrapper(this.getPage.getByRole("link", {name: "Reports"}), this)
    tabConfigure = new ElementWrapper(this.getPage.getByRole("link", {name: "Configure"}), this)
    tabLeaveList = new ElementWrapper(this.getPage.getByRole("link", {name: "Leave List"}), this)
    tabAssignLeave = new ElementWrapper(this.getPage.getByRole("link", {name: "Assign Leave"}), this)

    notiInfoTitle = new ElementWrapper(`//p[contains(@class, 'toast-title') and text() = 'Info']`, this)
    notiInfoContent = new ElementWrapper(`//p[contains(@class, 'toast-message') and text() = 'No Records Found']`, this)

    // notiInfoTitle = new ElementWrapper(this.getPage.getByRole('paragraph', {name: 'Info'}), this)
    // notiInfoContent = new ElementWrapper(this.getPage.getByRole('paragraph', {name: 'No Records Found'}), this)
}