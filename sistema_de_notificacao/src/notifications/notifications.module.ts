import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { EmailSender } from 'src/class/email.sender';
import { NOTIFICATION_SENDER } from 'src/interfaces/notification-sender.interface';

@Module({
  controllers: [NotificationsController],
  providers: [
    NotificationsService,
    { provide: NOTIFICATION_SENDER, useClass: EmailSender },
  ],
})
export class NotificationsModule {}
