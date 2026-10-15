import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import type { Request } from 'express';
import { randomUUID } from 'crypto';

@Injectable({ scope: Scope.REQUEST }) // scope REQUEST
export class RequestVisitsService {
  private readonly instanceId = randomUUID().slice(0, 8);
  private readonly visits = new Map<string, number>();

  constructor(@Inject(REQUEST) private readonly request: Request) {
    console.log(
      `///////////  [REQUEST] instância criada: ${this.instanceId}  ////////////`,
    );
  }

  hit(route: string) {
    const count = (this.visits.get(route) ?? 0) + 1;
    this.visits.set(route, count);
    return {
      instanceId: this.instanceId,
      route,
      count,
      method: this.request.method,
      userAgent: this.request.headers['user-agent'],
    };
  }
}
