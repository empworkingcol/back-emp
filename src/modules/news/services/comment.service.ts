import { Injectable, Logger } from '@nestjs/common';
import { Prisma, NewComment } from '@prisma/client';

import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class NewCommentService {
  constructor(private readonly prisma: PrismaService) {}

  private logger = new Logger('Comment service');

  async getAllComments({ page, limit }: { page: number; limit: number }) {
    const skip = (page - 1) * limit;
    this.logger.log('getAllComments');
    const data = await this.prisma.newComment.findMany({
      skip: skip,
      take: limit,
    });
    const total = await this.prisma.newComment.count();
    const totalPages = Math.ceil(total / limit);

    return {
      data,
      total,
      totalPages,
      currentPage: page,
    };
  }

  async createComment(data: Prisma.NewCommentCreateInput): Promise<NewComment> {
    this.logger.log('createComment');
    const createComment = await this.prisma.newComment.create({
      data,
    });

    return createComment;
  }

  async updateComment(params: {
    where: Prisma.NewCommentWhereUniqueInput;
    data: Prisma.NewCommentUpdateInput;
  }): Promise<NewComment> {
    this.logger.log('updateComment');
    const updateComment = await this.prisma.newComment.update({
      where: params.where,
      data: params.data,
    });
    return updateComment;
  }
}
