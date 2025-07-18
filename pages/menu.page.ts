import { BasePage } from '@utils/base.page'
import { Page } from '@playwright/test'
import { ElementWrapper } from '@/utils/element.wrapper'

const menuItemList : string[] = ['Admin', 'PIM', 'Leave', 'Time', 'Recruitment', 'My Info', 'Performance', 'Dashboard', 'Directory', 'Maintenance', 'Claim', 'Buzz'] as const
type MenuList = typeof menuItemList[number]

export class MenuPage extends BasePage {
    constructor(page: Page) {
        super(page)
    }

    btnOpenMenu = new ElementWrapper(`//button[contains(@class, 'main-menu-button')]`, this)
    txtboxSearch = new ElementWrapper(`//input[@placeholder='Search']`, this)
    btnMenuAdmin = new ElementWrapper(`//li[@class='oxd-main-menu-item-wrapper']/a/span[text() = 'Admin']`, this)
    btnMenuPIM = new ElementWrapper(`//li[@class='oxd-main-menu-item-wrapper']/a/span[text() = 'PIM']`, this)
    btnMenuLeave = new ElementWrapper(`//li[@class='oxd-main-menu-item-wrapper']/a/span[text() = 'Leave']`, this)
    btnMenuTime = new ElementWrapper(`//li[@class='oxd-main-menu-item-wrapper']/a/span[text() = 'Time']`, this)
    btnMenuRecruitment = new ElementWrapper(`//li[@class='oxd-main-menu-item-wrapper']/a/span[text() = 'Recruitment']`, this)
    btnMenuMyInfo = new ElementWrapper(`//li[@class='oxd-main-menu-item-wrapper']/a/span[text() = 'My Info']`, this)
    btnMenuPerformance = new ElementWrapper(`//li[@class='oxd-main-menu-item-wrapper']/a/span[text() = 'Performance']`, this)
    btnMenuDashboard = new ElementWrapper(`//li[@class='oxd-main-menu-item-wrapper']/a/span[text() = 'Dashboard']`, this)
    btnMenuDirectory = new ElementWrapper(`//li[@class='oxd-main-menu-item-wrapper']/a/span[text() = 'Directory']`, this)
    btnMenuMaintenance = new ElementWrapper(`//li[@class='oxd-main-menu-item-wrapper']/a/span[text() = 'Maintenance']`, this)
    btnMenuClaim = new ElementWrapper(`//li[@class='oxd-main-menu-item-wrapper']/a/span[text() = 'Claim']`, this)

    tltEmployeeList = new ElementWrapper(`//nav[@aria-label='Topbar Menu']//ul//li//a[text() = 'Employee List']`, this)

    clickMenu: Record<MenuList, () => Promise<void>> = {
        Admin: async() => {this.btnMenuAdmin.click()},
        PIM: async() => {this.btnMenuPIM.click()},
        Leave: async() => {this.btnMenuLeave.click()},
        Time: async() => {this.btnMenuTime.click()},
        Recruitment: async() => {this.btnMenuRecruitment.click()},
        'My Info': async() => {this.btnMenuMyInfo.click()},
        Performance: async() => {this.btnMenuPerformance.click()},
        Dashboard: async() => {this.btnMenuDashboard.click()},
        Directory: async() => {this.btnMenuMaintenance.click()},
        Claim: async() => {this.btnMenuClaim.click()},
    }
    
    public async accessToMenuItem(menuItem: MenuList) {
        //await this.btnOpenMenu.click()
        await this.clickMenu[menuItem]
        await this.waitForPageLoad()
    } 
}