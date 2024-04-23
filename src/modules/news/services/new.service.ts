import { Injectable, Logger } from '@nestjs/common';
import { Prisma, New } from '@prisma/client';

import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class NewService {
  constructor(private readonly prisma: PrismaService) {}

  private logger = new Logger('New service');

  async getNew(
    newWhereUniqueInput: Prisma.NewWhereUniqueInput,
  ): Promise<New | null> {
    this.logger.log('newById');
    const newData = await this.prisma.new.findUnique({
      where: newWhereUniqueInput,
    });
    return newData;
  }

  async getAllNews({ page, limit }: { page: number; limit: number }) {
    const skip = (page - 1) * limit;
    this.logger.log('getAllNews');
    const data = await this.prisma.new.findMany({
      skip: skip,
      take: limit,
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
