import { Module } from '@nestjs/common';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { ConversionsModuleModule } from 'src/conversions/conversions-module.module';

@Module({
  controllers: [ReportsController],
  providers: [ReportsService],
  imports: [ConversionsModuleModule],
})
export class ReportsModule {}
