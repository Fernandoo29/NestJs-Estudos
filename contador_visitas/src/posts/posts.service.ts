import { Injectable } from '@nestjs/common';
import { TransientVisitsService } from 'src/visits/transient-visits.service';

@Injectable()
export class PostsService {
  private readonly posts = [
    { slug: 'hello-nest', title: 'Hello Nest' },
    { slug: 'escopos', title: 'Entendendo escopos' },
  ];

  constructor(private readonly transientVisits: TransientVisitsService) {}

  get transientId(): string {
    return this.transientVisits.instanceId;
  }

  findBySlug(slug: string) {
    const post = this.posts.find((p) => p.slug === slug);
    if (!post) {
      throw new Error(`Post with slug ${slug} not found`);
    }
    return post;
  }
}
