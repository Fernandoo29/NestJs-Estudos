import { Controller, Get, ParseFloatPipe, Query } from '@nestjs/common';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('trip')
  trip(
    @Query('km', ParseFloatPipe) km: number,
    @Query('celsius', ParseFloatPipe) celsius: number,
    @Query('kg', ParseFloatPipe) kg: number,
  ) {
    return this.reportsService.tripSummary(km, celsius, kg);
  }
}
