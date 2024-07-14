import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { PostsService } from './posts.service';
import { ApiOkResponse, ApiQuery } from '@nestjs/swagger';
import { PaginatedPostsDto } from './paginated-posts.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  @ApiOkResponse({ type: PaginatedPostsDto })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Номер страницы (по умолчанию: 1)',
  })
  @ApiQuery({
    name: 'pageSize',
    required: false,
    type: Number,
    description: 'Количество постов на странице (по умолчанию: 10)',
  })
  async getPosts(
    @Query('page', ParseIntPipe) page = 1,
    @Query('pageSize', ParseIntPipe) pageSize = 10,
  ) {
    return await this.postsService.getPaginatedPosts(page, pageSize);
  }
}
