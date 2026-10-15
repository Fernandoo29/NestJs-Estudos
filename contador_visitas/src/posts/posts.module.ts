import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { VisitsModule } from 'src/visits/visits.module';

@Module({
  imports: [VisitsModule],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
