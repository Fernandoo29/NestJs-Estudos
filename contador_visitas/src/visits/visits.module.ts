import { Module } from '@nestjs/common';
import { SingletonVisitsService } from './singleton-visits.service';
import { RequestVisitsService } from './request-visits.service';
import { TransientVisitsService } from './transient-visits.service';

@Module({
  providers: [
    SingletonVisitsService,
    RequestVisitsService,
    TransientVisitsService,
  ],
  exports: [
    SingletonVisitsService,
    RequestVisitsService,
    TransientVisitsService,
  ],
})
export class VisitsModule {}
