import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConversionsModuleModule } from './conversions/conversions-module.module';
import { ReportsModule } from './reports/reports.module';

@Module({
  imports: [ConversionsModuleModule, ReportsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
