import { Injectable } from '@nestjs/common';

@Injectable()
export class PetsService {
  allPets(): string[] {
    const pets: string[] = ['Dog', 'Cat', 'Bird', 'Fish'];
    return pets;
  }
}
