import {
  NotificationResult,
  NotificationSender,
} from 'src/interfaces/notification-sender.interface';

export class EmailSender implements NotificationSender {
  send(to: string, message: string): NotificationResult {
    console.log(`[EMAIL] para ${to}: ${message}`);
    return {
      channel: 'email',
      to,
      message,
      sentAt: new Date().toISOString(),
    };
  }
}
