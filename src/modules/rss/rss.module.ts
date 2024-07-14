import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { RssTaskService } from './rss-task.service';
import { RssProcessor } from './rss.processor';
import { RssController } from './rss.controller';
import { PostsModule } from '../posts/posts.module';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    HttpModule,
    PostsModule,
    BullModule.registerQueue({
      name: 'rss',
    }),
  ],
  controllers: [RssController],
  providers: [RssTaskService, RssProcessor],
})
export class RssModule {}
