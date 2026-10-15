import {
  NotificationResult,
  NotificationSender,
} from 'src/interfaces/notification-sender.interface';

export class SmsSender implements NotificationSender {
  send(to: string, message: string): NotificationResult {
    console.log(`[SMS] para ${to}: ${message.slice(0, 160)}`);
    return {
      channel: 'SMS',
      to,
      message: message.slice(0, 160),
      sentAt: new Date().toISOString(),
    };
  }
}
