import { Inject, Injectable } from '@nestjs/common';
import { NOTIFICATION_SENDER } from '../interfaces/notification-sender.interface';
import type {
  NotificationResult,
  NotificationSender,
} from '../interfaces/notification-sender.interface';

@Injectable()
export class NotificationsService {
  constructor(
    @Inject(NOTIFICATION_SENDER)
    private readonly notificationSender: NotificationSender,
  ) {}

  notify(to: string, message: string): NotificationResult {
    console.log('teste', to, message);
    return this.notificationSender.send(to, message);
  }
}
