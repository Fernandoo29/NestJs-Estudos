import { Injectable } from '@nestjs/common';

@Injectable()
export class DistanceUnitConverterService {
  private readonly KM_PER_MILE = 1.60934;

  kmToMiles(km: number): number {
    return this.round(km / this.KM_PER_MILE);
  }

  milesToKm(miles: number): number {
    return this.round(miles * this.KM_PER_MILE);
  }

  private round(value: number): number {
    return Math.round(value * 100) / 100;
  }
}
