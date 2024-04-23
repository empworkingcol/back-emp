import { Injectable, Logger } from '@nestjs/common';
import { Prisma, ForumResponse } from '@prisma/client';

import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ForumResponseService {
  constructor(private readonly prisma: PrismaService) {}

  private logger = new Logger('ForumResponse service');

  async getForumResponse(
    forumResponseWhereUniqueInput: Prisma.ForumResponseWhereUniqueInput,
  ): Promise<ForumResponse | null> {
    this.logger.log('forumResponseById');
    const forumResponse = await this.prisma.forumResponse.findUnique({
      where: forumResponseWhereUniqueInput,
    });
    return forumResponse;
  }

  async getAllForumResponses({ page, limit }: { page: number; limit: number }) {
    const skip = (page - 1) * limit;
    this.logger.log('getAllForumResponses');
    const data = await this.prisma.forumResponse.findMany({
      skip: skip,
      take: limit,
    });
    const total = await this.prisma.forumResponse.count();
    const totalPages = Math.ceil(total / limit);

    return {
      data,
      total,
      totalPages,
      currentPage: page,
    };
  }

  async createForumResponse(
    data: Prisma.ForumResponseCreateInput,
  ): Promise<ForumResponse> {
    this.logger.log('createForumResponse');
    const createForumResponse = await this.prisma.forumResponse.create({
      data,
    });

    return createForumResponse;
  }

  async updateForumResponse(params: {
    where: Prisma.ForumResponseWhereUniqueInput;
    data: Prisma.ForumResponseUpdateInput;
  }): Promise<ForumResponse> {
    this.logger.log('updateForumResponse');
    const updateForumResponse = await this.prisma.forumResponse.update({
      where: params.where,
      data: params.data,
    });
    return updateForumResponse;
  }
}
