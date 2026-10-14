import { Injectable } from '@nestjs/common';
import { DistanceUnitConverterService } from 'src/conversions/distance-unit-converter.service';
import { TemperatureUnitConverterService } from 'src/conversions/temperature-unit-converter.service';
import { WeightUnitConverterService } from 'src/conversions/weight-unit-converter.service';

@Injectable()
export class ReportsService {
  constructor(
    private readonly temperatureUnitConverterService: TemperatureUnitConverterService,
    private readonly distanceUnitConverterService: DistanceUnitConverterService,
    private readonly weightUnitConverterService: WeightUnitConverterService,
  ) {}

  tripSummary(km: number, celsius: number, kg: number) {
    return {
      distance: { km, miles: this.distanceUnitConverterService.kmToMiles(km) },
      temperature: {
        celsius,
        fahrenheit:
          this.temperatureUnitConverterService.celsiusToFahrenheit(celsius),
      },
      weight: { kg, lb: this.weightUnitConverterService.kgToLb(kg) },
    };
  }
}
