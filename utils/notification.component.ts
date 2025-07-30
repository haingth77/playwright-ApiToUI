import { ElementWrapper } from '@utils/element.wrapper';
import { BasePage } from '@utils/base.page';
import { Page } from '@playwright/test';

export type NotificationType = 'Success' | 'Info' | 'Error' | 'Warning';

export class NotificationComponent extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  public getNotificationTitle(type: NotificationType): ElementWrapper {
    return new ElementWrapper(`//p[contains(@class, 'toast-title') and text() = '${type}']`, this);
  }

  public getNotificationContent(message: string): ElementWrapper {
    return new ElementWrapper(`//p[contains(@class, 'toast-message') and text() = '${message}']`, this);
  }
}
