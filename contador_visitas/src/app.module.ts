import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VisitsModule } from './visits/visits.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [VisitsModule, PostsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
