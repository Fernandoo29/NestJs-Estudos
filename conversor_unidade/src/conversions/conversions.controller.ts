import { Controller, Get, Param, ParseFloatPipe, Query } from '@nestjs/common';
import { TemperatureUnitConverterService } from './temperature-unit-converter.service';
import { DistanceUnitConverterService } from './distance-unit-converter.service';
import { WeightUnitConverterService } from './weight-unit-converter.service';

@Controller('conversions')
export class ConversionsController {
  constructor(
    private readonly temperatureUnitConverterService: TemperatureUnitConverterService,
    private readonly distanceUnitConverterService: DistanceUnitConverterService,
    private readonly weightUnitConverterService: WeightUnitConverterService,
  ) {}

  @Get('distance/:value')
  convertDistance(
    @Param('value', ParseFloatPipe) value: number,
    @Query('to') to = 'miles',
  ) {
    switch (to) {
      case 'miles':
        return {
          from: `${value} km`,
          to: `${this.distanceUnitConverterService.kmToMiles(value)} mi`,
        };
      case 'km':
        return {
          from: `${value} mi`,
          to: `${this.distanceUnitConverterService.milesToKm(value)} km`,
        };
      default:
        throw new Error(`Unsupported distance unit: ${to}`);
    }
  }

  @Get('temperature/:value')
  convertTemperature(
    @Param('value', ParseFloatPipe) value: number,
    @Query('to') to = 'f',
  ) {
    switch (to) {
      case 'f':
        return {
          from: `${value} °C`,
          to: `${this.temperatureUnitConverterService.celsiusToFahrenheit(value)} °F`,
        };
      case 'c':
        return {
          from: `${value} °F`,
          to: `${this.temperatureUnitConverterService.fahrenheitToCelsius(value)} °C`,
        };
      default:
        throw new Error(`Unsupported temperature unit: ${to}`);
    }
  }

  @Get('weight/:value')
  convertWeight(
    @Param('value', ParseFloatPipe) value: number,
    @Query('to') to = 'pounds',
  ) {
    switch (to) {
      case 'lb':
        return {
          from: `${value} kg`,
          to: `${this.weightUnitConverterService.kgToLb(value)} lbs`,
        };
      case 'kg':
        return {
          from: `${value} lbs`,
          to: `${this.weightUnitConverterService.lbToKg(value)} kg`,
        };
      default:
        throw new Error(`Unsupported weight unit: ${to}`);
    }
  }
}
