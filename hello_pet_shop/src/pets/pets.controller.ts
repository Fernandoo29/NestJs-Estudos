import { Controller, Get } from '@nestjs/common';
import { PetsService } from './pets.service';

@Controller('pets')
export class PetsController {
  constructor(private readonly petService: PetsService) {}

  @Get()
  findAll(): string[] {
    return this.petService.allPets();
  }

  @Get('dogs')
  findDogs(): string {
    return 'Dogs!';
  }
}
