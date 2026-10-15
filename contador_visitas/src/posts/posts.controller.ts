import { Controller, Get, Param } from '@nestjs/common';
import { PostsService } from './posts.service';
import { TransientVisitsService } from 'src/visits/transient-visits.service';
import { SingletonVisitsService } from 'src/visits/singleton-visits.service';
import { RequestVisitsService } from 'src/visits/request-visits.service';

@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly singleton: SingletonVisitsService,
    private readonly requestScoped: RequestVisitsService,
    private readonly transient: TransientVisitsService,
  ) {
    console.log('[PostsController] instância criada');
  }

  @Get(':slug')
  getPost(@Param('slug') slug: string) {
    const route = `/posts/${slug}`;

    return {
      post: this.postsService.findBySlug(slug),
      visits: {
        singleton: this.singleton.hit(route),
        request: this.requestScoped.hit(route),
        transient: this.transient.hit(route),
      },
      transientInstances: {
        controller: this.transient.instanceId,
        postService: this.postsService.transientId,
      },
    };
  }
}
