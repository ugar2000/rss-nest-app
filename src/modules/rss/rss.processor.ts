import { Process, Processor } from '@nestjs/bull';
import * as Parser from 'rss-parser';
import { PostsService } from '../posts/posts.service';

@Processor('rss')
export class RssProcessor {
  constructor(private readonly postsService: PostsService) {}

  @Process('fetch-and-parse-pss')
  async fetchAndParseRss() {
    console.log('Fetching RSS feed');

    const url = process.env.RSS_URL || 'https://www.reddit.com/.rss';

    const parser = new Parser();

    const feed = await parser.parseURL(url);

    for (const item of feed.items) {
      await this.postsService.createOrUpdatePost({
        title: item.title,
        content: item.content,
        pubDate: new Date(item.pubDate),
        link: item.link,
        feed: url,
      });
    }
  }
}
