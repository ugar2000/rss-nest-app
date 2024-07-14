import { ApiProperty } from '@nestjs/swagger';
import { Post } from '@prisma/client';

export class PaginatedPostsDto {
  @ApiProperty()
  posts: Post[];

  @ApiProperty({
    type: 'object',
    properties: {
      totalCount: { type: 'number' },
      totalPages: { type: 'number' },
      currentPage: { type: 'number' },
    },
  })
  pagination: {
    totalCount: number;
    totalPages: number;
    currentPage: number;
  };
}
