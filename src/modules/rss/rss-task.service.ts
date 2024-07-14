import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class RssTaskService {
  constructor(@InjectQueue('rss') private readonly rssQueue: Queue) {}

  @Cron('0 * * * *')
  async handleCron() {
    console.log('Called cron');
    await this.rssQueue.add('fetch-and-parse-pss', {});
  }
}
