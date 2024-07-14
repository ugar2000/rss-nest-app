import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Post } from '@prisma/client';

@Injectable()
export class PostsService {
  constructor(private readonly prismaService: PrismaService) {}

  async createOrUpdatePost(data: Omit<Post, 'id' | 'updatedAt' | 'createdAt'>) {
    return this.prismaService.post.upsert({
      where: {
        link: data.link,
      },
      update: data,
      create: data,
    });
  }

  async getPaginatedPosts(page: number, pageSize: number) {
    const skip = (page - 1) * pageSize;

    const [posts, totalCount] = await this.prismaService.$transaction([
      this.prismaService.post.findMany({
        skip,
        take: pageSize,
        orderBy: { pubDate: 'desc' },
      }),
      this.prismaService.post.count(),
    ]);

    const totalPages = Math.ceil(totalCount / pageSize);

    return {
      posts,
      pagination: {
        totalCount,
        totalPages,
        currentPage: page,
      },
    };
  }

  async createPost(data: Omit<Post, 'id'>) {
    const created = await this.prismaService.post.create({
      data,
    });

    return created;
  }

  async getPosts(): Promise<Post[]> {
    const posts = await this.prismaService.post.findMany();
    return posts;
  }

  async getPostById(id: number): Promise<Post> {
    const post = await this.prismaService.post.findUnique({
      where: {
        id,
      },
    });
    return post;
  }

  async updatePost(id: number, data: Partial<Post>): Promise<Post> {
    const updated = await this.prismaService.post.update({
      where: {
        id,
      },
      data,
    });
    return updated;
  }

  async deletePost(id: number): Promise<Post> {
    const deleted = await this.prismaService.post.delete({
      where: {
        id,
      },
    });
    return deleted;
  }
}
