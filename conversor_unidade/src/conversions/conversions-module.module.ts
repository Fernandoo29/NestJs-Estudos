import { Module } from '@nestjs/common';
import { TemperatureUnitConverterService } from './temperature-unit-converter.service';
import { DistanceUnitConverterService } from './distance-unit-converter.service';
import { WeightUnitConverterService } from './weight-unit-converter.service';
import { ConversionsController } from './conversions.controller';

@Module({
  controllers: [ConversionsController],
  providers: [
    TemperatureUnitConverterService,
    DistanceUnitConverterService,
    WeightUnitConverterService,
  ],
  exports: [
    TemperatureUnitConverterService,
    DistanceUnitConverterService,
    WeightUnitConverterService,
  ],
})
export class ConversionsModuleModule {}
