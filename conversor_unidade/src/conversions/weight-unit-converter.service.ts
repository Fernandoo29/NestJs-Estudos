import { Injectable } from '@nestjs/common';

@Injectable()
export class WeightUnitConverterService {
  private readonly LB_PER_KG = 2.20462;

  kgToLb(kg: number): number {
    return this.round(kg * this.LB_PER_KG);
  }

  lbToKg(lb: number): number {
    return this.round(lb / this.LB_PER_KG);
  }

  private round(value: number): number {
    return Math.round(value * 100) / 100;
  }
}
