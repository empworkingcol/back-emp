import { Injectable, Logger } from '@nestjs/common';
import { Prisma, New } from '@prisma/client';

import { PrismaService } from '../../prisma/prisma.service';
import { ResNewDto } from '../dto/res-new.dto';

@Injectable()
export class NewService {
  constructor(private readonly prisma: PrismaService) {}

  private logger = new Logger('New service');

  async getNew(
    newWhereUniqueInput: Prisma.NewWhereUniqueInput,
  ): Promise<ResNewDto | null> {
    this.logger.log('newById');
    const newData = await this.prisma.new.findUnique({
      where: newWhereUniqueInput,
      select: {
        new_id: true,
        new_title: true,
        new_text: true,
        img_url: true,
        new_comment: {
          select: {
            comment_text: true,
            creation_date: true,
            user: {
              select: {
                user_name: true,
              },
            },
          },
        },
        user: {
          select: {
            user_name: true,
          },
        },
        creation_date: true,
      },
    });
    return newData;
  }

  async getAllNews({ page, limit }: { page: number; limit: number }) {
    const skip = (page - 1) * limit;
    this.logger.log('getAllNews');
    const data = await this.prisma.new.findMany({
      skip: skip,
      take: limit,
      select: {
        new_id: true,
        new_title: true,
        new_text: true,
        img_url: true,
        new_comment: {
          select: {
            comment_text: true,
            creation_date: true,
            user: {
              select: {
                user_name: true,
              },
            },
          },
          orderBy: {
            creation_date: 'desc',
          },
          take: 3,
        },
        user: {
          select: {
            user_name: true,
          },
        },
        creation_date: true,
      },
    });
    const total = await this.prisma.new.count();
    const totalPages = Math.ceil(total / limit);

    return {
      data,
      total,
      totalPages,
      currentPage: page,
    };
  }

  async createNew(data: Prisma.NewCreateInput): Promise<New> {
    this.logger.log('createNew');
    const createNew = await this.prisma.new.create({
      data,
    });

    return createNew;
  }

  async updateNew(params: {
    where: Prisma.NewWhereUniqueInput;
    data: Prisma.NewUpdateInput;
  }): Promise<New> {
    this.logger.log('updateNew');
    const updateNew = await this.prisma.new.update({
      where: params.where,
      data: params.data,
    });
    return updateNew;
  }
}
