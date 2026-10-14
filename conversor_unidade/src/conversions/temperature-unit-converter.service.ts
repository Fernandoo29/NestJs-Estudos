import { Injectable } from '@nestjs/common';

@Injectable()
export class TemperatureUnitConverterService {
  celsiusToFahrenheit(celsius: number): number {
    return this.round((celsius * 9) / 5 + 32);
  }

  fahrenheitToCelsius(fahrenheit: number): number {
    return this.round(((fahrenheit - 32) * 5) / 9);
  }

  private round(value: number): number {
    return Math.round(value * 100) / 100;
  }
}
