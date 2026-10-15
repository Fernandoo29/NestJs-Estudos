import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

@Injectable() // scope DEFAULT
export class SingletonVisitsService {
  private readonly instanceId = randomUUID().slice(0, 8);
  private readonly visits = new Map<string, number>();

  constructor() {
    console.log(
      `///////////  [SINGLETON] instância criada: ${this.instanceId}  ////////////`,
    );
  }

  hit(route: string) {
    const count = (this.visits.get(route) ?? 0) + 1;
    this.visits.set(route, count);
    return { instanceId: this.instanceId, route, count };
  }
}
