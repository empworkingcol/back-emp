import { Injectable, Logger } from '@nestjs/common';
import { Prisma, LikeNew } from '@prisma/client';

import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class LikeNewService {
  constructor(private readonly prisma: PrismaService) {}

  private logger = new Logger('Like service');

  async countLikes() {
    this.logger.log('countAllLikes');
    const quantity = await this.prisma.likeNew.count();

    return quantity;
  }

  async createLike(data: Prisma.LikeNewCreateInput): Promise<LikeNew> {
    this.logger.log('createLike');
    const createLike = await this.prisma.likeNew.create({
      data,
    });

    return createLike;
  }
}
