import {
  NotificationResult,
  NotificationSender,
} from 'src/interfaces/notification-sender.interface';

export class PushSender implements NotificationSender {
  send(to: string, message: string): NotificationResult {
    console.log(`[PUSH] para dispositivo ${to}: ${message}`);
    return {
      channel: 'push',
      to,
      message,
      sentAt: new Date().toISOString(),
    };
  }
}
