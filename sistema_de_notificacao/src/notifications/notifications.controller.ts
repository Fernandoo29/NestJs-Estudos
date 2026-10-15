import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post('email')
  notify(@Body() body: { to?: string; message?: string }) {
    if (!body.to || !body.message) {
      throw new BadRequestException(
        'Missing "to" or "message" in request body',
      );
    }
    console.log('teste', this.notificationsService);
    return this.notificationsService.notify(body.to, body.message);
  }
}
