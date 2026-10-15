export interface NotificationResult {
  channel: string;
  to: string;
  message: string;
  sentAt: string;
}

export interface NotificationSender {
  send(to: string, message: string): NotificationResult;
}

export const NOTIFICATION_SENDER = Symbol('NOTIFICATION_SENDER');
